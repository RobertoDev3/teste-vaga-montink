'use client';

import { maskCurrencyBRL } from '@/lib/masks';
import { AddressProps, productDataProps } from '@/types/global';
import Image from 'next/image';
import { useEffect, useState, MouseEvent } from 'react';

const STORAGE_KEY = 'productPageState';
const EXPIRATION_MS = 15 * 60 * 1000; // 15 minutos

const productData: productDataProps = {
  title: 'X200 Sports Sneakers',
  price: 29990, // em centavos
  images: [
    'https://placehold.co/600x600.png?text=Image+1',
    'https://placehold.co/600x600.png?text=Image+2',
    'https://placehold.co/600x600.png?text=Image+3',
  ],
  variants: {
    sizes: [
      { size: '38', inStock: false },
      { size: '39', inStock: true },
      { size: '40', inStock: true },
      { size: '41', inStock: false },
      { size: '42', inStock: true },
    ],
    colors: [
      { color: 'Preto', inStock: true },
      { color: 'Branco', inStock: true },
      { color: 'Vermelho', inStock: false },
    ],
  },
};

export default function Home() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState<AddressProps>(null);
  const [cepError, setCepError] = useState('');

  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    if (saved.timestamp && Date.now() - saved.timestamp < EXPIRATION_MS) {
      setSelectedImage(saved.selectedImage ?? 0);
      setSize(saved.size ?? '');
      setColor(saved.color ?? '');
      setCep(saved.cep ?? '');
      setAddress(saved.address ?? null);
    } else localStorage.removeItem(STORAGE_KEY);
  }, []);

  useEffect(() => {
    const toSave = {
      selectedImage,
      size,
      color,
      cep,
      address,
      timestamp: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  }, [selectedImage, size, color, cep, address]);

  // eventos do zoom
  const handleMouseEnter = () => setIsZoomed(true);
  const handleMouseLeave = () => setIsZoomed(false);
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value.replace(/\D/g, '');
    if (v.length > 5) v = v.replace(/^(\d{5})(\d+)/, '$1-$2');
    setCep(v);
    setCepError('');
  };

  const lookupCep = async () => {
    const raw = cep.replace(/\D/g, '');
    if (raw.length !== 8) {
      setCepError('Digite um CEP válido (8 dígitos).');
      setAddress(null);
      return;
    }
    try {
      const res = await fetch(`https://viacep.com.br/ws/${raw}/json/`);
      const data = await res.json();
      setAddress({
        logradouro: data.logradouro,
        bairro: data.bairro,
        cidade: data.localidade,
        uf: data.uf,
      });
    } catch {
      setCepError('Não encontramos esse CEP.');
      setAddress(null);
    }
  };

  return (
    <div className='mx-auto flex max-w-5xl flex-col gap-8 p-6 md:flex-row'>
      <div className='w-full md:w-1/3'>
        <div
          className='group relative cursor-zoom-in'
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <Image
            src={productData.images[selectedImage]}
            alt='Main'
            width={600}
            height={600}
            className='h-auto w-full rounded-lg object-cover shadow'
          />

          {isZoomed && (
            <div
              className='pointer-events-none absolute top-0 left-full ml-4 hidden h-48 w-48 overflow-hidden rounded-lg border border-gray-400 bg-no-repeat md:block'
              style={{
                backgroundImage: `url(${productData.images[selectedImage]})`,
                backgroundSize: '200% 200%',
                backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
              }}
            />
          )}
        </div>

        <div className='mt-4 flex gap-2 overflow-x-auto p-1'>
          {productData.images.map((img, i) => (
            <Image
              key={i}
              src={img}
              alt={`Miniatura ${i + 1}`}
              width={100}
              height={100}
              onClick={() => setSelectedImage(i)}
              className={`h-16 w-16 cursor-pointer rounded object-cover ${
                i === selectedImage
                  ? 'ring-2 ring-blue-500'
                  : 'ring-1 ring-gray-200'
              }`}
            />
          ))}
        </div>
      </div>

      <div className='flex w-full flex-col gap-4 md:w-2/3'>
        <h1 className='text-2xl font-bold'>{productData.title}</h1>
        <p className='text-xl text-green-600'>
          {maskCurrencyBRL(productData.price)}
        </p>
        <div className='flex gap-4'>
          <div className='flex-1'>
            <label className='mb-1 block'>Tamanho:</label>
            <select
              value={size}
              onChange={e => setSize(e.target.value)}
              className='w-full rounded border p-2'
            >
              <option value='' disabled>
                Escolha
              </option>
              {productData.variants.sizes.map(item => (
                <option
                  key={item.size}
                  value={item.size}
                  disabled={!item.inStock}
                >
                  {item.size} {item.inStock ? '' : '(Esgotado)'}
                </option>
              ))}
            </select>
          </div>
          <div className='flex-1'>
            <label className='mb-1 block'>Cor:</label>
            <select
              value={color}
              onChange={e => setColor(e.target.value)}
              className='w-full rounded border p-2'
            >
              <option value='' disabled>
                Escolha
              </option>
              {productData.variants.colors.map(item => (
                <option
                  key={item.color}
                  value={item.color}
                  disabled={!item.inStock}
                >
                  {item.color} {item.inStock ? '' : '(Esgotado)'}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className='mt-6'>
          <label className='mb-1 block'>Consultar frete (CEP):</label>
          <div className='flex gap-2'>
            <input
              value={cep}
              onChange={handleCepChange}
              placeholder='00000-000'
              className='flex-1 rounded border p-2'
            />
            <button
              onClick={lookupCep}
              className='rounded bg-blue-600 px-4 text-white'
            >
              Consultar
            </button>
          </div>
          {cepError && <p className='mt-1 text-red-500'>{cepError}</p>}
          {address && (
            <div className='mt-2 text-gray-700'>
              {address.logradouro}, {address.bairro} – {address.cidade}/
              {address.uf}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { redirect } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/data/types/product';
import { api } from '@/data/api';

type SearchProps = {
    searchParams: {
        q: string;
    }
}

async function searchProducts(query: string): Promise<Product[]> {
    try {
        const response = await api(`/products/search?q=${query}`, {
            next: {
                revalidate: 60,
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }

        const products = await response.json();
        return products;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export default async function Search({ searchParams }: SearchProps) {
    const { q: query } = searchParams;

    if (!query) {
        redirect('/');
        return null;
    }

    const products: Product[] = await searchProducts(query);

    return (
        <div className="flex flex-col gap-4">
            <p className="text-sm">
                Resultados para:
                <span className="font-semibold"> {query}</span>
            </p>
            <div className="grid grid-cols-3 gap-6">
                {products.map(product => (
                    <Link key={product.id} href={`/product/${product.slug}`}
                        className="group relative flex rounded-lg bg-zinc-900 overflow-hidden justify-center items-end"
                    >
                        <Image
                            src={product.image}
                            className="group-hover:scale-105 transition-transform duration-500"
                            width={920}
                            height={920}
                            quality={100}
                            alt={product.title}
                        />
                        <div className="absolute bottom-10 right-10 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
                            <span className="text-sm truncate">{product.title}</span>
                            <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
                                {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 })}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
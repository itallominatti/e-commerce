import { api } from "@/data/api";
import { Product } from "@/data/types/product";
import { env } from "@/env";
import { ImageResponse } from "next/og";
import colors from 'tailwindcss/colors';

export const runtime = 'edge';

export const alt = 'About Acme';
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = 'image/png';

async function getProduct(slug: string): Promise<Product> {
    try {
        const response = await api(`/products/${slug}`, {
            next: {
                revalidate: 60 * 60, // 1 hour
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch product');
        }

        const product = await response.json();
        return product;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch product');
    }
}

export default async function OgImage({ params }: { params: { slug: string } }) {
    try {
        const product = await getProduct(params.slug);

        const productImageUrl = new URL(product.image, env.APP_URL).toString();

        return new ImageResponse(
            (
                <div
                    style={{
                        backgroundColor: colors.zinc['950'],
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <img src={productImageUrl} alt={alt} style={{ width: '100%' }} />
                </div>
            ),
        );
    } catch (error) {
        console.error(error);
        return new ImageResponse(
            (
                <div
                    style={{
                        backgroundColor: colors.red['500'],
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'white',
                        fontSize: '24px',
                    }}
                >
                    Error loading image
                </div>
            ),
            size
        );
    }
}
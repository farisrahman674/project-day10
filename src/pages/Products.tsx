import { useEffect, useState } from "react";
import { api } from "../service/api";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

type ProductType = {
  id: number;
  title: string;
  description: string;
};

export default function Products() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    null
  );

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Gagal fetch data products", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold mb-4 text-center">Products</h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          {products.map((product) => (
            <Dialog key={product.id}>
              <DialogTrigger asChild>
                <Card
                  onClick={() => setSelectedProduct(product)}
                  className="cursor-pointer hover:shadow-md transition"
                >
                  <CardHeader>
                    <CardTitle>{product.title}</CardTitle>
                    <CardDescription className="truncate">
                      {product.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{selectedProduct?.title}</DialogTitle>
                  <DialogDescription>
                    {selectedProduct?.description}
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          ))}
        </ul>
      )}
    </div>
  );
}

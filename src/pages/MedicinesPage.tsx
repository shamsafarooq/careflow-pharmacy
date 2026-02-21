import { useSearchParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pill, Search, Filter } from "lucide-react";
import { useState, useMemo } from "react";

export default function MedicinesPage() {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const initialCategory = searchParams.get("category") || "";

  const [search, setSearch] = useState(initialSearch);
  const [categoryFilter, setCategoryFilter] = useState(initialCategory);
  const [priceSort, setPriceSort] = useState("");

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase.from("categories").select("*");
      if (error) throw error;
      return data;
    },
  });

  const { data: medicines, isLoading } = useQuery({
    queryKey: ["medicines"],
    queryFn: async () => {
      const { data, error } = await supabase.from("medicines").select("*, categories(name)");
      if (error) throw error;
      return data;
    },
  });

  const filtered = useMemo(() => {
    let result = medicines || [];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(m =>
        m.name.toLowerCase().includes(q) ||
        m.generic_name?.toLowerCase().includes(q) ||
        m.brand?.toLowerCase().includes(q) ||
        m.description?.toLowerCase().includes(q) ||
        m.usage?.toLowerCase().includes(q)
      );
    }
    if (categoryFilter) {
      result = result.filter(m => m.category_id === categoryFilter);
    }
    if (priceSort === "asc") result = [...result].sort((a, b) => a.price - b.price);
    if (priceSort === "desc") result = [...result].sort((a, b) => b.price - a.price);
    return result;
  }, [medicines, search, categoryFilter, priceSort]);

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">All Medicines</h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search medicines..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories?.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={priceSort} onValueChange={setPriceSort}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Sort by Price" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">Default</SelectItem>
            <SelectItem value="asc">Price: Low → High</SelectItem>
            <SelectItem value="desc">Price: High → Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-40 bg-muted" />
              <CardContent className="p-4 space-y-3">
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-4 bg-muted rounded w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <Card className="p-12 text-center">
          <Pill className="h-12 w-12 mx-auto text-muted-foreground/40 mb-3" />
          <p className="text-muted-foreground">No medicines found matching your search.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(med => (
            <Card key={med.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-40 bg-muted flex items-center justify-center">
                {med.image_url ? (
                  <img src={med.image_url} alt={med.name} className="h-full w-full object-cover" />
                ) : (
                  <Pill className="h-12 w-12 text-muted-foreground/40" />
                )}
              </div>
              <CardContent className="p-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold line-clamp-1">{med.name}</h3>
                  {med.prescription_required && <Badge variant="destructive" className="text-[10px] shrink-0">Rx</Badge>}
                </div>
                {(med.categories as any)?.name && (
                  <Badge variant="outline" className="text-xs">{(med.categories as any).name}</Badge>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">${Number(med.price).toFixed(2)}</span>
                  <Badge variant={med.quantity > 0 ? "secondary" : "destructive"}>
                    {med.quantity > 0 ? "In Stock" : "Out of Stock"}
                  </Badge>
                </div>
                <Button asChild className="w-full" size="sm">
                  <Link to={`/medicines/${med.id}`}>View Details</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

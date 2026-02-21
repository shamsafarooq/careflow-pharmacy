import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Pill, ShieldCheck, Apple, Wind, Heart, Thermometer, Droplet, Eye, Cross, Activity } from "lucide-react";

const iconMap: Record<string, any> = {
  pill: Pill, shield: ShieldCheck, apple: Apple, wind: Wind, heart: Heart,
  thermometer: Thermometer, droplet: Droplet, eye: Eye, cross: Cross, activity: Activity,
};

export default function CategoriesPage() {
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase.from("categories").select("*");
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Medicine Categories</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {categories?.map(cat => {
          const Icon = iconMap[cat.icon || "pill"] || Pill;
          return (
            <Link key={cat.id} to={`/medicines?category=${cat.id}`}>
              <Card className="hover:border-primary/50 hover:shadow-md transition-all cursor-pointer text-center p-6">
                <CardContent className="pt-2 space-y-3">
                  <Icon className="h-10 w-10 mx-auto text-primary" />
                  <p className="font-medium">{cat.name}</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

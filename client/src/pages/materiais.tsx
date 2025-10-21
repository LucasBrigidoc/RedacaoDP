import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Presentation, Download, BookOpen } from "lucide-react";
import type { Material, WeeklyTheme } from "@shared/schema";

export default function MateriaisPage() {
  const { data: materials, isLoading: loadingMaterials } = useQuery<Material[]>({
    queryKey: ["/api/materials"],
  });

  const { data: weeklyTheme, isLoading: loadingTheme } = useQuery<WeeklyTheme>({
    queryKey: ["/api/weekly-theme"],
  });

  const handleDownload = (arquivo: string, titulo: string) => {
    window.open(arquivo, "_blank");
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <BookOpen className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold text-foreground dark:text-foreground">
          Materiais de Estudo
        </h1>
      </div>

      {loadingTheme ? (
        <Card className="bg-card dark:bg-card border-card-border dark:border-card-border">
          <CardHeader>
            <CardTitle className="text-card-foreground dark:text-card-foreground">
              Carregando tema...
            </CardTitle>
          </CardHeader>
        </Card>
      ) : weeklyTheme ? (
        <Card
          className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20 dark:bg-gradient-to-r dark:from-primary/20 dark:to-primary/10"
          data-testid="card-weekly-theme"
        >
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="default"
                    className="bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground"
                    data-testid="badge-theme-active"
                  >
                    Tema da Semana
                  </Badge>
                  <span className="text-sm text-muted-foreground dark:text-muted-foreground">
                    {new Date(weeklyTheme.semana).toLocaleDateString("pt-BR")}
                  </span>
                </div>
                <CardTitle className="text-2xl text-card-foreground dark:text-foreground" data-testid="text-theme-title">
                  {weeklyTheme.tema}
                </CardTitle>
                {weeklyTheme.descricao && (
                  <CardDescription className="text-base text-card-foreground/80 dark:text-foreground/70" data-testid="text-theme-description">
                    {weeklyTheme.descricao}
                  </CardDescription>
                )}
              </div>
            </div>
          </CardHeader>
        </Card>
      ) : (
        <Card className="bg-card dark:bg-card border-card-border dark:border-card-border">
          <CardHeader>
            <CardTitle className="text-card-foreground dark:text-card-foreground">
              Nenhum tema ativo no momento
            </CardTitle>
          </CardHeader>
        </Card>
      )}

      <div>
        <h2 className="text-2xl font-semibold mb-4 text-foreground dark:text-foreground">
          Biblioteca de Materiais
        </h2>

        {loadingMaterials ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card
                key={i}
                className="bg-card dark:bg-card border-card-border dark:border-card-border"
              >
                <CardHeader>
                  <div className="h-6 bg-muted dark:bg-muted rounded animate-pulse" />
                  <div className="h-4 bg-muted dark:bg-muted rounded animate-pulse" />
                </CardHeader>
                <CardContent>
                  <div className="h-10 bg-muted dark:bg-muted rounded animate-pulse" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : materials && materials.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {materials.map((material) => (
              <Card
                key={material.id}
                className="bg-card dark:bg-card border-card-border dark:border-card-border hover:border-primary/50 dark:hover:border-primary/50 transition-all"
                data-testid={`card-material-${material.id}`}
              >
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-lg">
                      {material.tipo === "slide" ? (
                        <Presentation className="h-6 w-6 text-primary dark:text-primary" />
                      ) : (
                        <FileText className="h-6 w-6 text-primary dark:text-primary" />
                      )}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg text-card-foreground dark:text-card-foreground" data-testid={`text-material-title-${material.id}`}>
                        {material.titulo}
                      </CardTitle>
                      <Badge
                        variant="secondary"
                        className="mt-2 bg-secondary text-secondary-foreground dark:bg-secondary dark:text-secondary-foreground"
                        data-testid={`badge-material-type-${material.id}`}
                      >
                        {material.tipo === "slide" ? "Slides" : "PDF"}
                      </Badge>
                    </div>
                  </div>
                  {material.descricao && (
                    <CardDescription className="text-sm mt-2 text-muted-foreground dark:text-muted-foreground" data-testid={`text-material-description-${material.id}`}>
                      {material.descricao}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={() => handleDownload(material.arquivo, material.titulo)}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90"
                    data-testid={`button-download-${material.id}`}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Baixar Material
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="bg-card dark:bg-card border-card-border dark:border-card-border">
            <CardHeader>
              <CardTitle className="text-card-foreground dark:text-card-foreground">
                Nenhum material disponível
              </CardTitle>
              <CardDescription className="text-muted-foreground dark:text-muted-foreground">
                Os materiais serão adicionados em breve.
              </CardDescription>
            </CardHeader>
          </Card>
        )}
      </div>
    </div>
  );
}

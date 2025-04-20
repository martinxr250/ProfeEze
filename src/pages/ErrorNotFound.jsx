import { useNavigate } from "react-router-dom"
import { AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const ErrorNotFound = () => {
    const navigate = useNavigate()

    return (
        <div className="flex min-h-[80vh] items-center justify-center p-4">
          <Card className="mx-auto max-w-md text-center">
            <CardHeader>
              <div className="flex justify-center">
                <AlertCircle className="h-16 w-16 text-destructive" />
              </div>
              <CardTitle className="text-3xl">404</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <h2 className="text-xl font-semibold">Página no encontrada</h2>
              <p className="text-muted-foreground">Lo sentimos, la página que estás buscando no existe o ha sido movida.</p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button onClick={() => navigate("/")}>
                Volver
              </Button>
            </CardFooter>
          </Card>
        </div>
      )
}

export { ErrorNotFound }
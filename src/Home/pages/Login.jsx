"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2, Eye, EyeOff, Mail, Phone, Instagram, Clock, PhoneIcon as WhatsApp } from "lucide-react"
import { useAuth } from "../../context/auth/AuthContext.jsx"

import { loginUsuario, registrarUsuario } from "../services/user.service.js"

const LoginRegisterForm = () => {
  const registerForm = useForm()
  const loginForm = useForm()

  const { login } = useAuth()

  const [showErrorModal, setShowErrorModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [modalMessage, setModalMessage] = useState("")
  const [showPassword, setShowPassword] = useState({
    register: false,
    login: false,
    confirmRegister: false,
  })

  // Variable para activar o desactivar el registro
  // Cambia a 'false' para desactivar el registro true o false.
  const registroActivado = false

  const navigate = useNavigate()

  const validateInput = (value) => {
    const sqlKeywords = ["SELECT", "INSERT", "UPDATE", "DELETE", "DROP", "UNION", "--"]
    return typeof value === "string" && !sqlKeywords.some((keyword) => value.toUpperCase().includes(keyword))
  }

  const onRegisterSubmit = async (data) => {
    // Verificar si el registro está desactivado
    if (!registroActivado) {
      setModalMessage("El registro está temporalmente deshabilitado por motivos de seguridad.")
      setShowErrorModal(true)
      return
    }

    if (!Object.values(data).every(validateInput)) {
      setModalMessage("Entrada inválida detectada. Por favor, revise sus datos.")
      setShowErrorModal(true)
      return
    }

    if (data.password !== data.confirmPassword) {
      setModalMessage("Las contraseñas no coinciden.")
      setShowErrorModal(true)
      return
    }

    data.dni = Number.parseInt(data.dni)

    console.log(data)

    try {
      const response = await registrarUsuario(data)
      if (response.error) {
        setModalMessage(response.error)
        setShowErrorModal(true)
      } else {
        setModalMessage("Tu cuenta ha sido creada correctamente. Por favor, inicia sesión.")
        setShowSuccessModal(true)
        registerForm.reset()
      }
    } catch (error) {
      setModalMessage("Ocurrió un error inesperado. Por favor, inténtelo más tarde.")
      setShowErrorModal(true)
    }
  }

  const onLoginSubmit = async (data) => {
    if (!Object.values(data).every(validateInput)) {
      setModalMessage("Entrada inválida detectada. Por favor, revise sus datos.")
      setShowErrorModal(true)
      return
    }

    console.log(data)

    try {
      const response = await loginUsuario(data)
      if (response.error) {
        setModalMessage(response.error)
        setShowErrorModal(true)
      } else {
        login(response)
        loginForm.reset()
        navigate("/bienvenida")
      }
    } catch (error) {
      setModalMessage("Ocurrió un error al iniciar sesión. Por favor, inténtelo más tarde.")
      setShowErrorModal(true)
    }
  }

  const togglePasswordVisibility = (form) => {
    setShowPassword((prev) => ({ ...prev, [form]: !prev[form] }))
  }

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false)
    navigate("/login")
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12 flex-grow flex items-center justify-center">
        <Card className="w-full max-w-md mx-auto shadow-lg border-0">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              {registroActivado ? (
                <TabsTrigger value="register">Registrarse</TabsTrigger>
              ) : (
                <TabsTrigger value="register" disabled>
                  Registro Desactivado
                </TabsTrigger>
              )}
              <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
            </TabsList>
            <TabsContent value="register">
              {registroActivado ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Regístrate</CardTitle>
                    <CardDescription>Ingrese sus datos para crear una cuenta.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...registerForm}>
                      <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                        <FormField
                          control={registerForm.control}
                          name="username"
                          rules={{
                            required: "Ingrese un nombre de usuario.",
                            minLength: {
                              value: 5,
                              message: "El nombre de usuario debe tener al menos 5 caracteres.",
                            },
                            maxLength: {
                              value: 20,
                              message: "El nombre de usuario debe tener máximo 20 caracteres.",
                            },
                            validate: validateInput,
                          }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nombre de usuario</FormLabel>
                              <FormControl>
                                <Input placeholder="ejemplo123" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={registerForm.control}
                          name="nombre"
                          rules={{
                            required: "Ingrese su nombre.",
                            validate: validateInput,
                          }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nombre</FormLabel>
                              <FormControl>
                                <Input placeholder="Juan Pérez" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={registerForm.control}
                          name="razonsocial"
                          rules={{
                            required: "Ingrese su razón social.",
                            validate: validateInput,
                          }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Razón Social (si no tiene, ingrese su nombre nuevamente)</FormLabel>
                              <FormControl>
                                <Input placeholder="Logísticas S.A." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={registerForm.control}
                          name="dni"
                          rules={{
                            required: "Ingrese su dni.",
                            validate: validateInput,
                            maxLength: {
                              value: 8,
                              message: "El DNI debe tener 8 dígitos.",
                            },
                            minLength: {
                              value: 8,
                              message: "El DNI debe tener 8 dígitos.",
                            },
                          }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>DNI</FormLabel>
                              <FormControl>
                                <Input placeholder="12345678" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={registerForm.control}
                          name="email"
                          rules={{
                            required: "Ingrese un correo electrónico",
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Ingrese un correo electrónico válido",
                            },
                            validate: validateInput,
                          }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Correo Electrónico</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="xxxxxxxxxx@xxxxxxxx.xxx" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={registerForm.control}
                          name="telefono"
                          rules={{
                            required: "Ingrese su teléfono.",
                            minLength: {
                              value: 8,
                              message: "El teléfono debe tener al menos 8 dígitos.",
                            },
                            maxLength: {
                              value: 13,
                              message: "El teléfono debe tener máximo 13 dígitos.",
                            },
                            validate: validateInput,
                          }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Teléfono (con codigo de área)</FormLabel>
                              <FormControl>
                                <Input placeholder="3511234567" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={registerForm.control}
                          name="password"
                          rules={{
                            required: "La contraseña es requerida.",
                            minLength: {
                              value: 5,
                              message: "La contraseña debe tener al menos 5 caracteres.",
                            },
                            validate: validateInput,
                          }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Contraseña</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input
                                    type={showPassword.register ? "text" : "password"}
                                    placeholder="********"
                                    {...field}
                                  />
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                    onClick={() => togglePasswordVisibility("register")}
                                  >
                                    {showPassword.register ? (
                                      <EyeOff className="h-4 w-4" />
                                    ) : (
                                      <Eye className="h-4 w-4" />
                                    )}
                                  </Button>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={registerForm.control}
                          name="confirmPassword"
                          rules={{
                            required: "Confirme su contraseña.",
                            validate: (value) =>
                              value === registerForm.getValues("password") || "Las contraseñas no coinciden.",
                          }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Confirmar Contraseña</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input
                                    type={showPassword.confirmRegister ? "text" : "password"}
                                    placeholder="********"
                                    {...field}
                                  />
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                    onClick={() => togglePasswordVisibility("confirmRegister")}
                                  >
                                    {showPassword.confirmRegister ? (
                                      <EyeOff className="h-4 w-4" />
                                    ) : (
                                      <Eye className="h-4 w-4" />
                                    )}
                                  </Button>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button type="submit" className="w-full">
                          Registrarse
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Registro Desactivado</CardTitle>
                    <CardDescription>
                      El registro de nuevos usuarios está temporalmente deshabilitado por motivos de seguridad.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Registro no disponible</AlertTitle>
                      <AlertDescription>Por favor, intente más tarde o contacte al administrador.</AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>Iniciar Sesión</CardTitle>
                  <CardDescription>Puede iniciar sesión con usuario o correo y contraseña.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                      <FormField
                        control={loginForm.control}
                        name="username"
                        rules={{
                          required: "El nombre de usuario es requerido",
                          validate: validateInput,
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nombre de usuario</FormLabel>
                            <FormControl>
                              <Input placeholder="Ingrese su nombre de usuario" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={loginForm.control}
                        name="password"
                        rules={{
                          required: "La contraseña es requerida",
                          minLength: { value: 5, message: "La contraseña debe tener al menos 5 caracteres." },
                          maxLength: { value: 20, message: "La contraseña debe tener máximo 20 caracteres." },
                          validate: validateInput,
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contraseña</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  type={showPassword.login ? "text" : "password"}
                                  placeholder="Ingrese su contraseña"
                                  {...field}
                                />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                  onClick={() => togglePasswordVisibility("login")}
                                >
                                  {showPassword.login ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </Button>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full">
                        Iniciar Sesión
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          <CardFooter className="flex justify-center space-x-6 mt-4 pt-4 border-t">
            <Link to="/">
              <Button variant="ghost" size="sm">
                Volver al Inicio
              </Button>
            </Link>
            <Link to="/recuperar-contrasena">
              <Button variant="ghost" size="sm">
                Recuperar Contraseña
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      <Dialog open={showErrorModal} onOpenChange={setShowErrorModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Error</DialogTitle>
            <DialogDescription>
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{modalMessage}</AlertDescription>
              </Alert>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setShowErrorModal(false)}>Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Éxito</DialogTitle>
            <DialogDescription>
              <Alert>
                <CheckCircle2 className="h-4 w-4" />
                <AlertTitle>Registro Exitoso</AlertTitle>
                <AlertDescription>{modalMessage}</AlertDescription>
              </Alert>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => window.location.reload()}>Ir a Iniciar Sesión</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="bg-black text-white border-t border-gray-800">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3">
                <img src="/Iconos/StoneMarket.png" alt="Stone Market Logo" className="w-16 h-16" />
                <h3 className="text-2xl" style={{ fontFamily: "'Permanent Marker', cursive" }}>
                  STONE MARKET
                </h3>
              </div>
              <p className="text-gray-400">Tu tienda online para zapatillas, vapes y gorras de calidad.</p>
            </div>
            <div>
              <h4 className="text-xl mb-4 flex items-center">
                <Clock className="mr-2" /> Horarios
              </h4>
              <p className="text-gray-400">Lunes a Domingo</p>
              <p className="text-gray-400">13:00PM a 04:00AM</p>
            </div>
            <div>
              <h4 className="text-xl mb-4">Contacto</h4>
              <a
                href="https://wa.me/5493518153322"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-400 hover:text-gray-200 transition-colors mb-2"
              >
                <WhatsApp className="mr-2" /> +5493518153322
              </a>
              <a
                href="https://instagram.com/stonemarket_cordoba"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-400 hover:text-gray-200 transition-colors"
              >
                <Instagram className="mr-2" /> stonemarket_cordoba
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 SkartIt. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export { LoginRegisterForm }


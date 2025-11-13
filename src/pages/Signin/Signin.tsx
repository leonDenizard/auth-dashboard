import { LogIn } from "lucide-react";
import Register from "@/components/login/Register";
import LoginComponent from "@/components/login/LoginComponent";
import ForgotPassword from "@/components/login/FogortPassword";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster } from "@/components/ui/sonner";

export default function Signin() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const cardVariants = {
    hiddenRight: { x: "1%", opacity: 0 },
    hiddenLeft: { x: "-1%", opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exitLeft: { x: "-1%", opacity: 0 },
    exitRight: { x: "1%", opacity: 0 },
  };

  return (
    <div className="flex flex-col items-center bg-zinc-950 min-h-screen px-4 py-8 md:py-16">
      <Toaster
        position="top-center"
        offset={24}
        toastOptions={{
          style: {
            background: "rgba(20, 83, 45, 0.4)",
            color: "#fff",
            border: "2px solid rgba(20, 83, 45, 0.5)",
          },
        }}
      />
      {/* Header fixo */}
      <header className="text-center mb-2 md:mb-6 2xl:mb-14 2xl:mt-10">
        <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-zinc-900 shadow-sm shadow-white/30 rounded-lg mb-4">
          <LogIn className="w-7 h-7 md:w-8 md:h-8 text-white" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">
          Bem-vindo
        </h1>
        <p className="text-zinc-400 text-sm md:text-base">
          {isRegistered ? "Cadastra-se grátis" : isForgotPassword ? "Cadastre uma nova senha" : "Faça login para continuar"}
        </p>
      </header>

      {/* Área animada */}
      <div className="flex-1 w-full max-w-md flex items-start justify-center">
        <AnimatePresence mode="wait">
          {isForgotPassword ? (
            <motion.div
              key="forgot"
              variants={cardVariants}
              initial="hiddenRight"
              animate="visible"
              exit="exitLeft"
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full"
            >
              <ForgotPassword onBack={() => setIsForgotPassword(false)} />
            </motion.div>
          ) : !isRegistered ? (
            <motion.div
              key="login"
              variants={cardVariants}
              initial="hiddenLeft"
              animate="visible"
              exit="exitRight"
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full"
            >
              <LoginComponent onSwitch={() => setIsRegistered(true)}
                onForgot={() => setIsForgotPassword(true)}
              />
            </motion.div>
          ) : (
            <motion.div
              key="register"
              variants={cardVariants}
              initial="hiddenRight"
              animate="visible"
              exit="exitLeft"
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full"
            >
              <Register
                onSwitch={() => setIsRegistered(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-2 text-center">
        <p className="text-zinc-600 text-xs md:text-sm">
          © 2025 Dashboard. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
}

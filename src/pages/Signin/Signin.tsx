import { LogIn } from "lucide-react";
import Register from "@/components/login/Register";
import LoginComponent from "@/components/login/LoginComponent";
import ForgotPassword from "@/components/login/FogortPassword";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster } from "@/components/ui/sonner";
import ColorBends from "@/components/login/ColorBends";
import SplitText from "@/components/ui/SplitText";

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

  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  return (
    <div className="relative w-screen min-h-screen ">
      <div className="fixed inset-0 w-full h-full z-0">
        <ColorBends
          colors={[
            "#FF0000", // vermelho
            "#FF7F00", // laranja
            "#FFFF00", // amarelo
            "#00FF00", // verde
            "#4B0082", // anil
            "#8F00FF", // violeta
          ]}
          rotation={10}
          speed={0.3}
          scale={2}
          frequency={1}
          warpStrength={1}
          mouseInfluence={0.1}
          parallax={0.1}
          noise={0.1}
          transparent={true}
          autoRotate={0}
        />
      </div>
      <div className="flex flex-col items-center bg-black/90 min-h-screen px-4 py-8 2xl:py-16 z-10">
        <Toaster
          position="top-center"
          offset={24}
          toastOptions={{
            style: {
              background: "rgba(20, 83, 45, 0.8)",
              color: "#fff",
              border: "2px solid rgba(20, 83, 45, 0.5)",
            },
          }}
        />
        {/* Header */}
        <header className="text-center mb-2 md:mb-6 2xl:mb-14 2xl:mt-10 z-10">
          <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 backdrop-blur-2xl bg-black/50 shadow-md shadow-white/10 rounded-lg mb-4">
            <LogIn className="w-7 h-7 md:w-8 md:h-8 text-white" />
          </div>
          {/* <h1
            className="block text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2"
            style={{
              textShadow: `
                0 0 20px rgba(0, 0, 0, 0.9),
                0 0 40px rgba(0, 0, 0, 0.8),
                0 0 60px rgba(0, 0, 0, 0.7),
                2px 2px 4px rgba(0, 0, 0, 0.5)
              `,
            }}
          >
            Bem-vindo
          </h1> */}
          <div>
            <SplitText
              text="Bem-vindo!"
              className="text-4xl font-bold text-center text-white text-shadow-lg py-1"
              delay={100}
              duration={2}
              ease="elastic.out(1, 0.3)"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
              onLetterAnimationComplete={handleAnimationComplete}
          
            />
          </div>
          <p className="text-zinc-400 text-sm md:text-base text-shadow-lg">
            {isRegistered
              ? "Cadastre-se grátis"
              : isForgotPassword
              ? "Cadastre uma nova senha"
              : "Faça login para continuar"}
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
                className="w-full z-10"
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
                className="w-full z-10"
              >
                <LoginComponent
                  onSwitch={() => setIsRegistered(true)}
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
                className="w-full z-10"
              >
                <Register onSwitch={() => setIsRegistered(false)} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <footer className="absolute bottom-2 text-center z-10">
          <p className="text-zinc-600 text-xs md:text-sm">
            © 2025 Dashboard. Todos os direitos reservados.
          </p>
        </footer>
      </div>
    </div>
  );
}

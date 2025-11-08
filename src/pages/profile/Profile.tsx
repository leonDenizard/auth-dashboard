// pages/profile/Profile.tsx
import { Home, User, Settings, BarChart, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  
  function logout() {
    navigate("/");
  }

  return (
    <div className="flex">
      {/* ========== SIDEBAR ========== */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-0"
        } transition-all duration-300 bg-zinc-900 border-r border-zinc-800 overflow-hidden`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-zinc-800">
          <h1 className="text-white text-xl font-bold">Dashboard</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-zinc-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-2">
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 text-white bg-zinc-800 rounded-lg"
          >
            <Home className="w-5 h-5" />
            <span>Home</span>
          </a>

          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <BarChart className="w-5 h-5" />
            <span>Analytics</span>
          </a>

          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <User className="w-5 h-5" />
            <span>Perfil</span>
          </a>

          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <Settings className="w-5 h-5" />
            <span>Configurações</span>
          </a>
        </nav>

        {/* Footer Sidebar */}
        <div onClick={logout} className="absolute bottom-0 w-64 p-4 border-t border-zinc-800">
          <button
            
            className="cursor-pointer flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-red-400 transition-colors w-full"
          >
            <LogOut className="w-5 h-5" />
            <span>Sair</span>
          </button>
        </div>
      </div>

      {/* ========== MAIN CONTENT ========== */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* ========== HEADER ========== */}
        <div className="h-16 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            {/* Botão Mobile Menu */}
            <button
              onClick={() => setSidebarOpen(true)}
              className={`${
                sidebarOpen ? "hidden" : "block"
              } text-zinc-400 hover:text-white`}
            >
              <Menu className="w-6 h-6" />
            </button>

            <h2 className="text-white text-xl font-semibold">Bem-vindo!</h2>
          </div>

          {/* User Info */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-white text-sm font-medium">Leon Denizard</p>
              <p className="text-zinc-400 text-xs">Admin</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center">
              <User className="w-5 h-5 text-zinc-300" />
            </div>
          </div>
        </div>

        {/* ========== CONTENT AREA ========== */}
        <div className="flex-1 overflow-y-auto p-6 bg-zinc-950">
          {/* Stats Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* Card 1 */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-zinc-400 text-sm">Total Usuários</p>
                <User className="w-5 h-5 text-blue-500" />
              </div>
              <h3 className="text-white text-3xl font-bold">1,234</h3>
              <p className="text-green-500 text-xs mt-2">+12% este mês</p>
            </div>

            {/* Card 2 */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-zinc-400 text-sm">Receita</p>
                <BarChart className="w-5 h-5 text-green-500" />
              </div>
              <h3 className="text-white text-3xl font-bold">R$ 45,2K</h3>
              <p className="text-green-500 text-xs mt-2">+8% este mês</p>
            </div>

            {/* Card 3 */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-zinc-400 text-sm">Vendas</p>
                <BarChart className="w-5 h-5 text-purple-500" />
              </div>
              <h3 className="text-white text-3xl font-bold">892</h3>
              <p className="text-red-500 text-xs mt-2">-3% este mês</p>
            </div>

            {/* Card 4 */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-zinc-400 text-sm">Taxa Conversão</p>
                <Settings className="w-5 h-5 text-orange-500" />
              </div>
              <h3 className="text-white text-3xl font-bold">3.2%</h3>
              <p className="text-green-500 text-xs mt-2">+0.5% este mês</p>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Large Card - Gráfico */}
            <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-lg p-6">
              <h3 className="text-white text-lg font-semibold mb-4">
                Vendas Mensais
              </h3>

              {/* Fake Chart Area */}
              <div className="h-64 bg-zinc-950 rounded border border-zinc-800 flex items-center justify-center">
                <p className="text-zinc-600">Área do Gráfico</p>
              </div>
            </div>

            {/* Activity section */}
            <section className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
              <h3 className="text-white text-lg font-semibold mb-4">
                Atividades Recentes
              </h3>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-white text-sm">
                      Novo usuário registrado
                    </p>
                    <p className="text-zinc-500 text-xs">há 5 minutos</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-white text-sm">Venda completada</p>
                    <p className="text-zinc-500 text-xs">há 12 minutos</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-white text-sm">Produto atualizado</p>
                    <p className="text-zinc-500 text-xs">há 1 hora</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-white text-sm">Novo comentário</p>
                    <p className="text-zinc-500 text-xs">há 2 horas</p>
                  </div>
                </div>
              </div>
            </section>

          </div>

          

          {/* Bottom Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Table Card */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
              <h3 className="text-white text-lg font-semibold mb-4">
                Últimos Pedidos
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between items-center pb-3 border-b border-zinc-800">
                  <div>
                    <p className="text-white text-sm font-medium">#12345</p>
                    <p className="text-zinc-500 text-xs">Cliente A</p>
                  </div>
                  <span className="text-green-500 text-sm font-medium">
                    R$ 299,00
                  </span>
                </div>

                <div className="flex justify-between items-center pb-3 border-b border-zinc-800">
                  <div>
                    <p className="text-white text-sm font-medium">#12344</p>
                    <p className="text-zinc-500 text-xs">Cliente B</p>
                  </div>
                  <span className="text-green-500 text-sm font-medium">
                    R$ 450,00
                  </span>
                </div>

                <div className="flex justify-between items-center pb-3 border-b border-zinc-800">
                  <div>
                    <p className="text-white text-sm font-medium">#12343</p>
                    <p className="text-zinc-500 text-xs">Cliente C</p>
                  </div>
                  <span className="text-green-500 text-sm font-medium">
                    R$ 125,00
                  </span>
                </div>
              </div>
            </div>

            {/* Info Card */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
              <h3 className="text-white text-lg font-semibold mb-4">
                Informações do Sistema
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-zinc-400 text-sm">Versão</span>
                  <span className="text-white text-sm font-medium">v2.1.0</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-400 text-sm">
                    Última Atualização
                  </span>
                  <span className="text-white text-sm font-medium">
                    15/11/2025
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-400 text-sm">Uptime</span>
                  <span className="text-green-500 text-sm font-medium">
                    99.9%
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-400 text-sm">Servidor</span>
                  <span className="text-white text-sm font-medium">
                    AWS US-EAST-1
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

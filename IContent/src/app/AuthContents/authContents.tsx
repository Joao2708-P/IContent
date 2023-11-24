'use client'
import { createContext, useContext, useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';

// Define as interfaces do usuário e do contexto de autenticação
interface User {
  name: string;
  user_name: string;
  email: string;
  password: string;
  image_user: string;
  schoolLevelId: string;
}

interface AuthContextData {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  //criando o estado do usuario e settado como vazio
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Verifica se há um token JWT no armazenamento local ao carregar a página
    const token = localStorage.getItem('jwtToken');
    if (token) {
      try {
        const decodedToken = jwt.decode(token);
        if (decodedToken) {
          // Atualiza o estado do usuário no contexto com as informações do token decodificado
          setUser(decodedToken as User);
          return;
        }
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
      }

      // Caso o token esteja inválido ou expirado, faz logout
      logout();
    }
  }, []);

  // Função para fazer login com o token JWT
  const login = (token: string) => {
    // Armazena o token no armazenamento local
    localStorage.setItem('jwtToken', token);
    // Decodifica o token e atualiza o estado do usuário no contexto
    const decodedToken = jwt.decode(token);
    if (decodedToken) {
      console.log(decodedToken)
      setUser(decodedToken as User);
    }
  };

  // Função para fazer logout
  const logout = () => {
    // Remove o token do armazenamento local
    localStorage.removeItem('jwtToken');
    // Remove as informações do usuário do estado do contexto
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider
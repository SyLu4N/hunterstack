import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col mt-20 w-full items-center">
      <img
        className="w-[300px] sm:w-1/4 max-w-[400px]"
        src="/notFound.png"
        alt="Imagem de um robo quebrado. Ilustrando a página 404"
      />

      <h1 className="text-4xl font-bold">Página não encontrada.</h1>
      <p className="text-xl text-center">
        A página que você procura não existe. Deseja voltar para o início?
      </p>

      <Link
        href="/"
        className="text-letter-500 font-bold text-3xl mt-12 underline"
      >
        Ir para o início
      </Link>
    </div>
  );
}

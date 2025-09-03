export function EmptyPolicy() {
  return (
    <div className="flex flex-col mt-24 w-full items-center">
      <img
        className="ml-6 w-[300px] sm:w-1/4 max-w-[400px]"
        src="/empty.png"
        alt="Imagem de um robo dormindo, ilustrando uma página vazia"
      />

      <h2 className="text-2xl font-bold">Não tem nada aqui!</h2>
      <p className="text-center">
        Ainda não temos políticas salvas, verifique o filtro ou tente novamente
        mais tarde.
      </p>
    </div>
  );
}

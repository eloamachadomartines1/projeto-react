export default function CardProd({produto}){
    return (
        <div>
            <h2>id {produto.id} nome{produto.nome}</h2>
            <p>Descrição{produto.descricao}</p>
            <p>Estoque</p>
            <p>Preço</p>
        </div>
    )
}
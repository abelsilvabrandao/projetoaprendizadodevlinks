<?php
// Verifica se o método de requisição é POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recupera os dados do formulário
    $nomeEvento = $_POST["eventName"];
    $enderecoEvento = $_POST["eventAddress"];
    $telefoneContato = $_POST["contactPhone"];
    $emailContato = $_POST["contactEmail"];
    $descricaoEvento = $_POST["eventDescription"];

    // Monta o corpo do e-mail
    $mensagem = "Nome do Evento: $nomeEvento\n";
    $mensagem .= "Endereço do Evento: $enderecoEvento\n";
    $mensagem .= "Telefone para Contato: $telefoneContato\n";
    $mensagem .= "E-mail de Contato: $emailContato\n";
    $mensagem .= "Descrição do Evento:\n$descricaoEvento";

    // Define o destinatário do e-mail (seu endereço de e-mail)
    $destinatario = "abelsilvabrandao@hotmail.com";

    // Define o assunto do e-mail
    $assunto = "Novo formulário de contato - orçamento: $nomeEvento";

    // Envia o e-mail
    $enviado = mail($destinatario, $assunto, $mensagem);
    //

    // Verifica se o e-mail foi enviado com sucesso
    if ($enviado) {
        // Retorna uma resposta de sucesso para o JavaScript
        echo json_encode(array("success" => true));
    } else {
        // Retorna uma resposta de erro para o JavaScript
        echo json_encode(array("success" => false));
    }
} else {
    // Se o método de requisição não for POST, retorna um erro
    http_response_code(405);
    echo "Método não permitido";
}
?>


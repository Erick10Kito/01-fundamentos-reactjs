import styles from "./Post.module.css";
import { Comment } from "./Comment";
import { Avatar } from "./Avatar";
import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { useState } from "react";

export function Post({ author, publishedAt, content }) {
  const [newCommentText, setNewCommentText] = useState("");
  const [comments, setComments] = useState([]);

  const publishedDateFormatted = format(
    publishedAt,
    "d 'de' LLLL 'às' HH:mm'h'",
    {
      locale: ptBR,
    }
  );

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });
  function handleNewCommentChange() {
    event.target.setCustomValidity("");
    // coloquei esse event aqui para que o sistema reconhça que quando o usuario digitar quer dizer que não precisa aparecer nenhuma mensagem de erro

    setNewCommentText(event.target.value);
    //usado para setar o valor que chegou dentro da textarea na qual a função esta sendo chammada atraves de um onChange como 'newCommentText'
  }

  function handleCrateNewComment() {
    //event.target.comment.value = ""; //usado para zerar o valor do textarea depois de setar o comentario de forma imperativa
    //const newCommentText = event.target.comment.value; // corresponde ao valor inserido na textarea, na qual eu coloquei um 'name="comment"' de forma imperativa
    event.preventDefault();
    setComments([...comments, newCommentText]); //pega os comentarios anteriores e adiciona o comentario que chegou atraves da textarea
    setNewCommentText(""); //Seta o texto da textarea com aspas vazias para tirar qualquer texto de la, depois que que o submit de setComments for efetuado
  }

  function handleNewCommentInvalid() {
    //função que troca o texto de invalidação
    event.target.setCustomValidity("Digite antes de publicar");
  }

  function deleteComment(commentToDelete) {
    //função para que remove o comentario, lembrando que ela foi feita aqui pelo fato do useState do comment ser feito aqui!

    const commentsWithoutDeletedOne = comments.filter((comment) => {
      //essa const filtra os comentarios para que só apareça os comentarios que são diferentes dos selecionados para deletar(commentToDelete),
      //ou seja diferente dos comentarios que tiveram o botão de lixeira clicado
      return comment !== commentToDelete;
    });

    setComments(commentsWithoutDeletedOne);
    //agora eu atualizo a lista de comentarios com o setComments, toda vez que o deleteComment for ativado(Atraves do botão de lixo)
    // e passo o commentsWithoutDeletedOne para que cada vez que ele atualize, ele siga o filtro que eu criei
  }

  const isNewCommentEmpty = newCommentText.length === 0; //essa const diz que isNewCommentEmpty é igual a quando a quantidade de caracteres do estado "newCommentText" for igual a zero

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time
          title={publishedDateFormatted}
          dateTime={publishedAt.toISOString()}
        >
          {publishedDateRelativeToNow}
        </time>
      </header>
      <div className={styles.content}>
        {content.map((line) => {
          if (line.type === "paragraph") {
            return <p key={line.content}>{line.content}</p>;
          } else if (line.type === "link") {
            return (
              <p key={line.content}>
                <a href={line.content}>{line.content}</a>
              </p>
            );
          }
        })}
      </div>
      <form onSubmit={handleCrateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea
          onChange={handleNewCommentChange}
          value={newCommentText}
          placeholder="Deixe um comentário"
          onInvalid={handleNewCommentInvalid} //propriedade para quando o textarea for invalido, que nesse caso puxa a função que contem o novo texto de invalidação!
          required //para não deixar que o usuario coloque um comentario sem conteudo, caso a pessoa tente publicar um comentario sem nada escrito, aparece um mensagem falando que não pode
        />

        <footer>
          <button disabled={isNewCommentEmpty} type="submit">
            {/*Eu puxo a const 'isNewCommentEmpty' dentro do disabled, 
            para que o disable só execute quando a const definida estiver acontecendo(só vai ser disabled quando a quantidade de caracteres no textarea for igual a zero)*/}
            Publicar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map((comment) => {
          return (
            <Comment
              key={comment}
              content={comment}
              onDeleteComment={deleteComment} // passei a função que remove comentario como propriedade, para que seja possivel puxa-la em outro componente
            />
          );
        })}
      </div>
    </article>
  );
}

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
        />

        <footer>
          <button type="submit">Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map((comment) => {
          return <Comment key={comment} content={comment} />;
        })}
      </div>
    </article>
  );
}

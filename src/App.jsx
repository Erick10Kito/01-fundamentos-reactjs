import { Header } from "./components/Header";
import { Post } from "./components/Post";
import styles from "./App.module.css";
import "./global.css";
import { Sidebar } from "./components/Sidebar";

// author: {avatar_url:"", name:"", role:""}
//publishedAt:Date
// content:String

const posts = [
  {
    id: 1,
    author: {
      avatarUrl: "https://github.com/Erick10Kito.png",
      name: "Erick de Bem Campos",
      role: "Dev Imedia",
    },
    content: [
      { type: "paragraph", content: "Fala Galera" },
      {
        type: "paragraph",
        content: "Acabei de subir mais um projeto no meu portifolio",
      },
      { type: "link", content: "https://www.google.com/" },
    ],
    publishedAt: new Date("2022-11-16 06:00:00"),
  },
  {
    id: 2,
    author: {
      avatarUrl: "https://github.com/juanfariasdev.png",
      name: "Juan Pablo Farias",
      role: "Dev Gestor de Equipe Imedia",
    },
    content: [
      { type: "paragraph", content: "Fala Galera" },
      {
        type: "paragraph",
        content: "Acabei de subir mais um projeto no meu portifolio",
      },
      { type: "link", content: "https://www.google.com/" },
    ],
    publishedAt: new Date("2022-11-16 07:00:00"),
  },
];

export function App() {
  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map((post) => {
            return (
              <Post
                key={post.id}
                author={post.author}
                content={post.content}
                publishedAt={post.publishedAt}
              />
            );
          })}
        </main>
      </div>
    </div>
  );
}

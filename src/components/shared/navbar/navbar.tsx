import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

import { QwikLogo } from "../../icons/qwik";
import styles from "./navbar.module.css";

export default component$(() => {
  return (
    <header class={styles.header}>
      <div class={["container", styles.wrapper]}>
        <div class={styles.logo}>
          <Link href="/"> <QwikLogo height={50} /> </Link>
        </div>
        <ul>
          <li>
            <Link href="/login/">Login</Link>
          </li>
          <li>
            <Link href="/dashboard/">Dashboard</Link>
          </li>
          <li>
            <Link href="/counter/">Counter Hook</Link>
          </li>
          <li>
            <Link href="/pokemons/list-ssr/">List - SSR</Link>
          </li>
          <li>
            <Link href="/pokemons/list-client/">List - Client</Link>
          </li>
        </ul>
      </div>
    </header>
  );
});

import Link from 'next/link';

export default () => (
  <header>

  <h1>
    <Link prefetch href="/">
    <a>
    Ferrytracker
    </a>
    </Link>
  </h1>
  <style jsx>{`
    h1 {
      font-family: sans-serif;
    }
    a {
      text-decoration: none;
      color: black;
    }
    header {
      // background-color: #aaa;
      padding: .5rem;
    }
  `}</style>
  </header>

);

import { useEffect, useState } from "react";


import { useAuthenticator } from '@aws-amplify/ui-react';


function App() {
  const { signOut } = useAuthenticator();



  return (
    <main>
      <h1>My todos</h1>
      
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div>

      <button onClick={signOut}>Sign out</button>
    </main>
  );
}

export default App;

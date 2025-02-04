import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    // try {
    //   const response = await fetch("/api/generate", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ animal: animalInput }),
    //   });

    //   const data = await response.json();
    //   if (response.status !== 200) {
    //     throw data.error || new Error(`Request failed with status ${response.status}`);
    //   }

    //   setResult(data.result);
    //   setAnimalInput("");
    // } catch(error) {
    //   // Consider implementing your own error handling logic here
    //   console.error(error);
    //   alert(error.message);
    // }


    const apiKey = "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";
    // const prompt = "Once upon a time";
    const url = "https://api.openai.com/v1/chat/completions";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        // prompt: prompt,
        max_tokens: 120,
        model: "gpt-3.5-turbo",
        messages: [{ "role": "user", "content": animalInput }],
      })
    })
      .then(response => response.json())
      // .then(data => console.log(data))
      .then(data => setResult(data.choices[0].message.content))
      .catch(error => console.error(error));

  }

  return (
    <div>
      <Head>
        <title>OpenAI Demo</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>网页chat</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            placeholder="Enter prompt"
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
          />
          <input type="submit" value="Generate" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}

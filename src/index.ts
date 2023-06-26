import axios from 'axios';

const main = async () => {
  let prompt = `This is conversation between John and Jane. Reply as either John or Jane. Not both.\nJohn: Hi, I'm Jane. How are you?`;

  let talker = 'Jane';

  prompt = `${prompt}\n${talker}:`;

  for (let i = 0; i < 15; i++) {
    if (prompt.length < 1) {
      console.log('\x1b[31m%s\x1b[0m', 'error: prompt is empty');
      continue;
    }
    console.log('\x1b[32m%s\x1b[0m', `sending:`);
    console.log(prompt);
    const result = await axios.post('http://127.0.0.1:8080/completion', {
      prompt,
      n_predict: 64,
      batch_size: 64,
      n_keep: 48,
      // temperature: 0
    });

    // the response is received until completion finish
    prompt = result.data.content.trim();
    // prompt = prompt + '\n' + result.data.content.trim();
    // console.debug('\x1b[32m%s\x1b[0m', `res:"${result.data.content}"\n\n---\n`);
    // if (prompt.includes('John:') && prompt.includes('Jane:')) {
    //   console.log('\x1b[31m%s\x1b[0m', 'error: both John and Jane are in the response');
    //   break;
    // }

    if (i % 2 !== 0) {
      talker = 'John';
    } else {
      talker = 'Jane';
    }
    if (prompt.length > 1 && !prompt.startsWith(`${talker}:`)) {
      // console.debug('\x1b[32m%s\x1b[0m', `prompt: "${prompt}"`);
      prompt = `${talker}: ${prompt}`;
    }
  }
};

main();

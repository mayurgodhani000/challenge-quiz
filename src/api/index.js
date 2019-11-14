import axios from 'axios';

export class Api {
  static async fetchQuestions() {
    let data = '';
    const response = await axios.get('https://raw.githubusercontent.com/outlier-org/challenge-quiz/master/src/questions.json').catch((err) => {
      data = { error: 'something went wrong', err };
    });
    return data || response.data;
  }
}

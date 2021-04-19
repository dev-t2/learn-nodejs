const path = require('path');
const fs = require('fs').promises;

exports.templateDescription = ({ title, description }) => `
  <h2>${title}</h2>

  <p>${description}</p>
`;

exports.templateForm = () => `
  <form method="POST" action="http://localhost:3000/create-process">
    <div>
      <input type="text" name="title" placeholder="Title"/>
    </div>

    <div>
      <textarea name="description" placeholder="Description"></textarea>
    </div>

    <div>
      <button type="submit">Submit</button>
    </div>
  </form>
`;

exports.templateHtml = async ({ title, controls = [], contents }) => {
  const folderPath = path.join(__dirname, '..', 'data');
  const fileList = await fs.readdir(folderPath);

  const contentsList = fileList.map(file => {
    const name = file.split('.')[0];

    return `<li><a href="/?id=${name}">${name}</a></li>`;
  });

  const controlsList = controls.map(control => {
    if (control === 'update') {
      return `<a href="/${control}?id=${title}">${control.toUpperCase()}</a>`;
    }

    return `<a href="/${control}">${control.toUpperCase()}</a>`;
  });

  return `
    <!DOCTYPE html>
    <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <title>${title}</title>
      </head>

      <body>
        <h1>
          <a href="/">WEB</a>
        </h1>

        <ul>
          ${contentsList.join('')}
        </ul>

        <div>
          ${controlsList.join(' ')}
        </div>

        ${contents}
      </body>
    </html>
  `;
};
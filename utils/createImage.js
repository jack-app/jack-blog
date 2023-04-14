import fs from "fs";

const createImage = async function (id, name, url) {
  // 期限付きの画像を取得してpublicディレクトリに保存する
  // 参考: https://github.com/0si43/shetommy.com/pull/36/files

  const path = `public/${id}/`;
  const cover = `${path}/${name}.png`;

  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }

  const src = await fetch(url).then((r) => r.blob());
  const binary = await src.arrayBuffer();
  const buffer = Buffer.from(binary);

  await fs.promises.writeFile(cover, buffer);

  const result = `/${id}/${name}.png`;
  return result;
};

export default createImage;

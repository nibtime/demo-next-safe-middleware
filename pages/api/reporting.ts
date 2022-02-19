import type { NextApiHandler } from 'next';

const handler: NextApiHandler = (req, res) => {
  console.log(req.body);
  res.status(202).end();
};
export default handler;

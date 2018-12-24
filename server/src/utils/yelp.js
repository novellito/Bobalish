import yelp from 'yelp-fusion';
const client = yelp.client(process.env.YELP_KEY);

export { client as default };

import { auth } from 'express-oauth2-jwt-bearer';

const jwtCheck = auth({
  audience: "http://localhost:8000",  // Ensure this matches your API Identifier
  issuerBaseURL: "https://dev-r7c2ij5l4bw1lseq.us.auth0.com",  // Correct issuer URL
  tokenSigningAlg: "RS256"
});

export default jwtCheck;

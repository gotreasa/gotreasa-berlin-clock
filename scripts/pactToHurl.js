// Turns the consumer pact into a Hurl file: one request per interaction,
// checked against the status the pact expects. The base URL is the Hurl
// variable {{url}}, so the same file runs against localhost or a deployment.

const queryString = (query) =>
  typeof query === 'string'
    ? query
    : new URLSearchParams(
        Object.entries(query).flatMap(([key, values]) =>
          [].concat(values).map((value) => [key, value]),
        ),
      ).toString();

const requestLine = ({ method, path, query }) =>
  `${method.toUpperCase()} {{url}}${path}${query ? `?${queryString(query)}` : ''}`;

const headerLines = (headers = {}) =>
  Object.entries(headers).map(([name, value]) => `${name}: ${value}`);

// Hurl takes JSON inline and any other body as a multiline string.
const bodyLines = (body) => {
  if (body === undefined) {
    return [];
  }

  return typeof body === 'string'
    ? ['```', body, '```']
    : [JSON.stringify(body)];
};

const entry = ({ description, request, response }) =>
  [
    `# ${description}`,
    requestLine(request),
    ...headerLines(request.headers),
    ...bodyLines(request.body),
    `HTTP ${response.status}`,
    '',
  ].join('\n');

export const pactToHurl = (pact) => {
  if (!pact.interactions?.length) {
    throw new Error('The pact has no interactions');
  }

  return pact.interactions.map(entry).join('\n');
};

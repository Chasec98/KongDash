export default Object.freeze({
  protocols: ["https", "http", "tcp", "tls", "udp", "grpc", "grpcs"],
  methods: [
    "POST",
    "GET",
    "PUT",
    "HEAD",
    "DELETE",
    "CONNECT",
    "OPTIONS",
    "TRACE",
    "PATCH"
  ],
  pathHandlers: ["v0", "v1"],
  hashOptions: ["none", "consumer", "ip", "header", "cookie"],
  algorithms: ["round-robin", "consistent-hashing", "least-connections"]
});

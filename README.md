# HOW TO RUN
## Directly from source
```
  npm install
  npm run start
```
## Via Docker
```
  docker build --progress=plain -t covid-cinema-seat:latest .
  docker run -p 3333:3333 covid-cinema-seat:latest

  #Remove & cleanup
  docker image rm -f covid-cinema-seat:latest
```
##

# HOW TO TEST
- This gRPC app is running & expose via port 3333 (by default)
- BloomRPC app can be used as an gRPC client app to interact with gRPC server
  - Ref: (https://github.com/uw-labs/bloomrpc)

- Test flow:
  - Call CreateUser rpc with valid email, password to store user data
  - Call Login rpc to get JWT token
  - With each rpc call in latter part, a bearer token must be set via metadata
    -  `Authorization: Bearer` sample-token

# App configuration
- Configuration is stored and setup in `.env` file
  - `CINEMA_ROW_SIZE`: setup initial value for cinema row.
  - `CINEMA_COLUMN_SIZE`: setup initial value for cinema column.
  - `ENTRYPOINT_GRPC_PORT`: the gRPC port which server listening on. (default: 3333)
  - `CINEMA_DISTANCE_BETWEEN_SEAT`: the minimum distance allow between seat. (default: 2)
  - `CINEMA_FIRST_RESERVE_SPACE`: setup the default reserve seat in the cinema. (default: [1, 1])

# App structure
**Where to initiate the instances**:
- `src/entrypoints/index.js` is where the app load and bootup
- `src/configuration` contain detail configuration / setup (which related to entrypoints / applications / infrastructures)

**Folder structure**:
- `applications`: Contain main application logic.
- `entities`: Contain things related to business and use for the whole system.
- `entrypoints`: Contain things which exposed the outside world (HTTP, gRPC, ...)
- `infrastructures`: Contain code to use external resource (database, HTTP service, ...)

# Side note
- For the convenience, the whole cinema data and user data is created and cached in memory directly. This might cause a slow startup / crash due to Node's heap size limit.
- The `--max-old-space-size=<value>` is set inside `package.json` to overcome the issue.
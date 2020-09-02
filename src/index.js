console.log("server starting up...Have a nice day.");

const http = require('http');
const port = process.env.PORT || process.env.NODE_PORT || 3000;
const indexPage = `<html>
                    <h1>Welcome to Jokes!!</h1>
                    <p>Standard joke service is here --><a href ="./stale-joke">stale-joke</a></p>
                    <p>Random joke service is also here --> <a href ="./random-joke">random-joke</a></p>
                    </html>`;
const jokes = [{
        "q": "Why did the chicken cross the road?",
        "a": "To get to the other side!"
    },
    {
        "q": "What do you call a very small valentine?",
        "a": "A valen-tiny!"
    },
    {
        "q": "What did the dog say when he rubbed his tail on the sandpaper?",
        "a": "Ruff, Ruff!"
    },
    {
        "q": "Why don't sharks like to eat clowns?",
        "a": "Because they taste funny!"
    },
    {
        "q": "What did the boy cat say to the girl cat?",
        "a": "You're Purr-fect!"
    },
    {
        "q": "What is a frog's favorite outdoor sport?",
        "a": "Fly Fishing!"
    }
];
const getIndex = (request, response) => {
    response.writeHead(200, {
        'Content-Type': 'text/html',
    });
    response.write(indexPage);
    response.end();

}

const getStaleJoke = (request, response) => {
    response.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });
    const json = JSON.stringify(jokes[0]);
    response.write(json);
    response.end();
}

const getRandomJoke = (request, response) => {
    response.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });
    const joke = jokes[Math.floor(Math.random() * jokes.length)]
    const json = JSON.stringify(joke);
    response.write(json);
    response.end();
}



const onRequest = (request, response) => {
    console.log(request.url);
    if (request.url == "/stale-joke") {
        getStaleJoke(request, response);
    } else if (request.url == "/random-joke") {
        getRandomJoke(request, response);
    } else {
        getIndex(request, response);
    }
}

http.createServer(onRequest).listen(port);
console.log(`listening on 127.0.0.1:${port}`);
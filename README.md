# Backend-Futebol-Clube

<h2>O projeto é um backend de um site sobre os times de futebol, as partidas e as classificações.</h2>

<h2>Linguagem, ferramentas e bibliotecas utilizadas:</h2>

* TypeScript
* Node
* Express
* Sequelize
* MySQL
* JasonWebToken
* Mocha
* Chai
* Sinon
* Docker
  
  <h2>Endpoints:</h2>
  
  <h3>Endpoint: POST /login</h3>
  
  - O body da requisição:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
  
  * O usuário realizar o login com seu email e senha.
  * Gerar um token.
  * Retorna `status 200` e o `token`
  
  * Se email e/ou senha não forem enviados:
  * Retorna `status 400` com a mensagem `All fields must be filled`
  
  * Se email e/ou senha forem incorretos:
  * Retorna `status 401` com a mensagem `Incorrect email or password`
  
  <h3>Endpoint: GET /login/validate</h3>
  
  * O usuário consegue visualizar sua função.
  * Retorna `status 200` e a `função do usuário`.
  
  <h3>Endpoint: GET /teams</h3>
  
  * Contém as informações, como id e nome de todos os times.
  * Retorna `status 200` e um `array de objeto com todos os times`.
  
```json
[
	{
		"id": 1,
		"teamName": "Avaí/Kindermann"
	},
	{
		"id": 2,
		"teamName": "Bahia"
	},
	{
		"id": 3,
		"teamName": "Botafogo"
	},
	...
]
```
  
 
  <h3>Endpoint: GET /teams/:id</h3>
  
  * Contém as informações, como id e nome do time.
  * Retorna `status 200` e um `objeto com id e nome do time`.
  
  ```json
{
	"id": 5,
	"teamName": "Cruzeiro"
}
```
  
  <h3>Endpoint: GET /matches</h3>
  
  * Contém as informações, como id, time da casa e os gols, time vizitante e os gols, se a partida
  está em progresso ou não.
  * Retorna `status 200` e um `array de objeto com todas as partidas`.
  
  ```json
    [
      {
        "id": 1,
        "homeTeam": 16,
        "homeTeamGoals": 1,
        "awayTeam": 8,
        "awayTeamGoals": 1,
        "inProgress": false,
        "teamHome": {
          "teamName": "São Paulo"
        },
        "teamAway": {
          "teamName": "Grêmio"
        }
      },
      ...
      {
        "id": 41,
        "homeTeam": 16,
        "homeTeamGoals": 2,
        "awayTeam": 9,
        "awayTeamGoals": 0,
        "inProgress": true,
        "teamHome": {
          "teamName": "São Paulo"
        },
        "teamAway": {
          "teamName": "Internacional"
        }
      }
    ]
   ```
  
  <h3>Endpoint: GET /matches/inPorgress</h3>
  
  * Quando /matches/inProgress?q=true: 
    Retorna `status 200` e um `array de objeto com todas as partidas que estão em progresso`.
  
  * Quando /matches/inProgress?q=false: 
    Retorna `status 200` e um `array de objeto com todas as partidas que não estão em progresso`.
  
  
  <h3>Endpoint: POST /matches</h3>
  
  * Recebe do body:
  
  ```json
  {
    "homeTeam": 16,
    "awayTeam": 8,
    "homeTeamGoals": 2,
    "awayTeamGoals": 2
  }
  ```
  
  * E salva a partida com o status de inProgress como true no banco de dados.
  
  * Retorna `status 201` com as informações:
  
  
  ```json
  {
    "id": 1,
    "homeTeam": 16,
    "homeTeamGoals": 2,
    "awayTeam": 8,
    "awayTeamGoals": 2,
    "inProgress": true,
  }
  ```
  
  <h3>Endpoint: PATCH /matches/:id/finish</h3>
  
  * Altera o status inProgress da partida para false, ou seja, finaliza a partida.
  * Retorna `status 200` com a mensagem `Finished`.
  
  <h3>Endpoint: PATCH /matches/:id</h3>
  
  * Recebe do body:
  ```json
  {
    "homeTeamGoals": 3,
    "awayTeamGoals": 1
  }
  ```
  
  * Atualiza os gols da partida.
  * Retorna `status 200` com a mensagem `Goals changed successfully`.
  
  <h3>Endpoint: get /leaderboard/home</h3>
  
  * Retorna `status 200` com a seguinte requisição:
  
  ```js
[
    {
      name: 'Santos',
      totalPoints: '9',
      totalGames: '3',
      totalVictories: '3',
      totalDraws: '0',
      totalLosses: '0',
      goalsFavor: '9',
      goalsOwn: '3',
      goalsBalance: '6',
      efficiency: '100'
    },
    {
      name: 'Palmeiras',
      totalPoints: '7',
      totalGames: '3',
      totalVictories: '2',
      totalDraws: '1',
      totalLosses: '0',
      goalsFavor: '10',
      goalsOwn: '5',
      goalsBalance: '5',
      efficiency: '77.78'
    },
    {
      name: 'Corinthians',
      totalPoints: '6',
      totalGames: '2',
      totalVictories: '2',
      totalDraws: '0',
      totalLosses: '0',
      goalsFavor: '6',
      goalsOwn: '1',
      goalsBalance: '5',
      efficiency: '100'
    },
    {
      name: 'Grêmio',
      totalPoints: '6',
      totalGames: '2',
      totalVictories: '2',
      totalDraws: '0',
      totalLosses: '0',
      goalsFavor: '4',
      goalsOwn: '1',
      goalsBalance: '3',
      efficiency: '100'
    },
    {
      name: 'Real Brasília',
      totalPoints: '6',
      totalGames: '2',
      totalVictories: '2',
      totalDraws: '0',
      totalLosses: '0',
      goalsFavor: '2',
      goalsOwn: '0',
      goalsBalance: '2',
      efficiency: '100'
    },
    {
      name: 'São Paulo',
      totalPoints: '4',
      totalGames: '2',
      totalVictories: '1',
      totalDraws: '1',
      totalLosses: '0',
      goalsFavor: '4',
      goalsOwn: '1',
      goalsBalance: '3',
      efficiency: '66.67'
    },
    {
      name: 'Internacional',
      totalPoints: '4',
      totalGames: '3',
      totalVictories: '1',
      totalDraws: '1',
      totalLosses: '1',
      goalsFavor: '4',
      goalsOwn: '6',
      goalsBalance: '-2',
      efficiency: '44.44'
    },
    {
      name: 'Botafogo',
      totalPoints: '4',
      totalGames: '3',
      totalVictories: '1',
      totalDraws: '1',
      totalLosses: '1',
      goalsFavor: '2',
      goalsOwn: '4',
      goalsBalance: '-2',
      efficiency: '44.44'
    },
    {
      name: 'Ferroviária',
      totalPoints: '3',
      totalGames: '2',
      totalVictories: '1',
      totalDraws: '0',
      totalLosses: '1',
      goalsFavor: '3',
      goalsOwn: '2',
      goalsBalance: '1',
      efficiency: '50'
    },
    {
      name: 'Napoli-SC',
      totalPoints: '2',
      totalGames: '2',
      totalVictories: '0',
      totalDraws: '2',
      totalLosses: '0',
      goalsFavor: '2',
      goalsOwn: '2',
      goalsBalance: '0',
      efficiency: '33.33'
    },
    {
      name: 'Cruzeiro',
      totalPoints: '1',
      totalGames: '2',
      totalVictories: '0',
      totalDraws: '1',
      totalLosses: '1',
      goalsFavor: '2',
      goalsOwn: '3',
      goalsBalance: '-1',
      efficiency: '16.67'
    },
    {
      name: 'Flamengo',
      totalPoints: '1',
      totalGames: '2',
      totalVictories: '0',
      totalDraws: '1',
      totalLosses: '1',
      goalsFavor: '1',
      goalsOwn: '2',
      goalsBalance: '-1',
      efficiency: '16.67'
    },
    {
      name: 'Minas Brasília',
      totalPoints: '1',
      totalGames: '3',
      totalVictories: '0',
      totalDraws: '1',
      totalLosses: '2',
      goalsFavor: '3',
      goalsOwn: '6',
      goalsBalance: '-3',
      efficiency: '11.11'
    },
    {
      name: 'Avaí/Kindermann',
      totalPoints: '1',
      totalGames: '3',
      totalVictories: '0',
      totalDraws: '1',
      totalLosses: '2',
      goalsFavor: '3',
      goalsOwn: '7',
      goalsBalance: '-4',
      efficiency: '11.11'
    },
    {
      name: 'São José-SP',
      totalPoints: '0',
      totalGames: '3',
      totalVictories: '0',
      totalDraws: '0',
      totalLosses: '3',
      goalsFavor: '2',
      goalsOwn: '5',
      goalsBalance: '-3',
      efficiency: '0'
    },
    {
      name: 'Bahia',
      totalPoints: '0',
      totalGames: '3',
      totalVictories: '0',
      totalDraws: '0',
      totalLosses: '3',
      goalsFavor: '0',
      goalsOwn: '4',
      goalsBalance: '-4',
      efficiency: '0'
    }
]
```
  

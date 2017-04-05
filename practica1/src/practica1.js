/**
 * MemoryGame es la clase que representa nuestro juego. Contiene un array con la cartas del juego,
 * el número de cartas encontradas (para saber cuándo hemos terminado el juego) y un texto con el mensaje
 * que indica en qué estado se encuentra el juego
 */
var MemoryGame = MemoryGame || {};

var GameState = new Array("Memory Game", "Try again", "Match found", "You win!!");

var CardState = new Array("facedown", "faceup", "found");

/**
 * Constructora de MemoryGame
 */
MemoryGame = function(gs) {

	this.graphicServer = gs;

	this.cards = new Array();

	this.gameState = GameState[0];

	this.cardFaceUp = null;

	this.numCardsFaceUp = 0;

	this.pairs = 0;

	this.initGame =  function () {
		//Crea las cartas
		this.cards.push(new MemoryGameCard("8-ball"));
		this.cards.push(new MemoryGameCard("8-ball"));
		this.cards.push(new MemoryGameCard("potato"));
		this.cards.push(new MemoryGameCard("potato"));
		this.cards.push(new MemoryGameCard("dinosaur"));
		this.cards.push(new MemoryGameCard("dinosaur"));
		this.cards.push(new MemoryGameCard("kronos"));
		this.cards.push(new MemoryGameCard("kronos"));
		this.cards.push(new MemoryGameCard("rocket"));
		this.cards.push(new MemoryGameCard("rocket"));
		this.cards.push(new MemoryGameCard("unicorn"));
		this.cards.push(new MemoryGameCard("unicorn"));
		this.cards.push(new MemoryGameCard("guy"));
		this.cards.push(new MemoryGameCard("guy"));
		this.cards.push(new MemoryGameCard("zeppelin"));
		this.cards.push(new MemoryGameCard("zeppelin"));

		//Desordena las cartas
		this.cards.sort(function(a,b) {
			return 0.5 - Math.random();
		});

		//Llama al loop principal para pintar
		this.loop();
	}

	//Dibuja el juego
	this.draw = function () {
		//Pintamos el estado del juego
		this.graphicServer.drawMessage(this.gameState);

		//Cada carta se tiene que pintar
		for (i in this.cards) 
			this.cards[i].draw(this.graphicServer, i);
	}

	this.loop = function() {
		var self = this;
		setInterval(function() {
			self.draw();
		}, 16);
	}

	this.onClick = function(cardId) {

		//Si no se ha hecho click sobre una carta no hacemos nada
		if (cardId == null || this.numCardsFaceUp == 2)
			return;
		

		var card = this.cards[cardId];

        //Si la carta esta boca arriba o encontrada no hacemos nada
		if (card.state == CardState[1] || card.state == CardState[2]) 
			return;

		card.flip();

		this.numCardsFaceUp++;

		//Si hay dos cartas dadas la vuelta		
		if (this.numCardsFaceUp == 2) {
			//Si la carta volteada es igual que la que acabamos de voltear
			if (this.cardFaceUp.compareTo(card)) {
				this.cardFaceUp.found();
				card.found();
				this.pairs += 1;
				if (this.pairs == 8)
					this.gameState = GameState[3];
				else 
					this.gameState = GameState[2];
				
				this.numCardsFaceUp = 0;

			//Si la carta volteada no es igual que la que habia volteada
			} else {
				this.gameState = GameState[1];
				var card1 = this.cardFaceUp;
				var self = this;

				setTimeout(function() {
					card1.flip();
					card.flip();
					self.numCardsFaceUp = 0;}
					, 500);
			}	

			this.cardFaceUp = null;

		} else {
			this.cardFaceUp = card;
		}
		
	}

};





/**
 * Constructora de las cartas del juego. Recibe como parámetro el nombre del sprite que representa la carta.
 * Dos cartas serán iguales si tienen el mismo sprite.
 * La carta puede guardar la posición que ocupa dentro del tablero para luego poder dibujarse
 * @param {string} id Nombre del sprite que representa la carta
 */
MemoryGameCard = function(id) {

	this.name = id;

	this.state = CardState[0];


	this.flip = function() {
		if (this.state == CardState[0]) 
			this.state = CardState[1];

		else if (this.state == CardState[1])
			this.state = CardState[0];
	}

	this.found = function() {
		this.state = CardState[2];
	}

	this.compareTo = function(otherCard) {
		return (this.name == otherCard.name);
	}

	this.draw = function(gs, pos) {
		if (this.state == CardState[0])
			gs.draw("back", pos);

		else
			gs.draw(this.name, pos);
	}


};

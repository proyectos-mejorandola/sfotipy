function Model(){
	this.actual = -1
	this.songs = []
	this._isPlaying = false
	this._isMute = false
	this._isRandom = false
}

Model.prototype = new Observable()

Model.prototype.goTo = function( index ){
	if (this.isRandom()) 
		index = this.getRandomIndex()
	this.setActive( index )
}
Model.prototype.getRandomIndex = function(){
	var index = Math.floor((Math.random()*this.songs.length)) 
	if (index===this.actual) 
		index = this.getRadomIndex()
	return index 
}
Model.prototype.setSongs = function( songs ){
	this.songs = songs
	this.trigger('songs-changed', this.songs)
}
Model.prototype.setSongs = function( songs ){
	this.songs = songs
	this.trigger('songs-changed', this.songs)
}
Model.prototype.getActual = function(){
	return this.songs[ this.actual ]
}
Model.prototype.getActualIndex = function(){
	return this.actual
}
Model.prototype.setActive = function( index ){
	if( index < 0 || index >= this.songs.length ) index = 0
	this._isPlaying = true
	this.actual = index
	this.trigger('active-song', this.songs[ index ])	
}
Model.prototype.setPlaying = function( bool ){
	this._isPlaying = bool
	if( bool ) this.trigger('playing')
	else this.trigger('paused')
}
Model.prototype.setMute = function( bool ){
	this._isMute = bool
	this.trigger('mute', this._isMute)
}
Model.prototype.setRandom = function( bool ){
	this._isRandom = bool
	console.log("Random",bool)
}
Model.prototype.isPlaying = function(){
	return this._isPlaying
}
Model.prototype.isMute = function(){
	return this._isMute
}
Model.prototype.isRandom = function(){
	return this._isRandom
}
function View(){
	var self = this

	this.elems = {}
	this.elems.audio = document.createElement('audio')
	document.body.appendChild( this.elems.audio )

	this.elems.list = $('#list')
	this.elems.play = $('#play')
	this.elems.next = $('#next')
	this.elems.prev = $('#prev')
	this.elems.mute = $('#mute')
	this.elems.random = $('#random')
	this.elems.avatar = $('.music .image img')
	this.elems.name = $('.playing .name')
	this.elems.artist = $('.playing .author')

	// Delegación del click
	this.elems.list.on('click', '.song', function(){
		self.trigger('song-clicked', $(this).attr('data-id'))
	})
	this.elems.play.on('click', function(){
		self.trigger('play-clicked')
		$(this).toggleClass( 'icon-play icon-stop').toggleClass('active inactive')
		return false
	})
	this.elems.next.on('click', function(){
		self.trigger('next-clicked')
		return false
	})
	this.elems.prev.on('click', function(){
		self.trigger('prev-clicked')
		return false
	})
	this.elems.mute.on('click', function() {
		self.trigger('mute-clicked')
		$(this).toggleClass( "active inactive")
		return false
	})
	this.elems.random.on('click',function(){
		self.trigger('random-clicked')
		$(this).toggleClass( "active inactive")
		return false
	})

	// Creación de mi template de canciones
	this.template = Handlebars.compile( $('#song-tmpl').html() )
}
View.prototype = new Observable()
View.prototype.updateList = function( songList ){
	this.elems.list.html( this.template( { songs: songList } ) ) 
}
View.prototype.updateActive = function( song ){
	this.elems.avatar.attr('src', song.cover)
	this.elems.name.text( song.name )
	this.elems.artist.text( song.artist )

	this.elems.audio.pause()
	this.elems.audio.src = song.src
	this.elems.audio.play()
}
View.prototype.playSong = function(){
	this.elems.audio.play()
}
View.prototype.pauseSong = function(){
	this.elems.audio.pause()
}

View.prototype.mute = function( bool){
	this.elems.audio.muted = bool
}

var controller = {
	init: function(){
		var self = this

		// Instancio mi modelo y vista
		this.model = new Model()
		this.view = new View()

		// Escuchar eventos del modelo
		this.model.on('songs-changed', function( e, songs ){
			self.view.updateList( songs )
		})
		this.model.on('active-song', function( e, song ){
			self.view.updateActive( song )
		})
		this.model.on('playing', function( e, song ){
			self.view.playSong( song )
		})
		this.model.on('paused', function( e, song ){
			self.view.pauseSong( song )
		})
		this.model.on('mute', function( e, bool ){
			self.view.mute( bool )
		})

		// Escuchar eventos de la vista
		this.view.on('song-clicked', function( e, index ){
			self.model.setActive( index )
		})
		this.view.on('play-clicked', function(){
			self.model.setPlaying( !self.model.isPlaying() )
		})
		this.view.on('mute-clicked', function(){
			self.model.setMute( !self.model.isMute())
		})  
		this.view.on('next-clicked', function(){
			self.model.goTo( self.model.getActualIndex() + 1 )
		}) 
		this.view.on('prev-clicked', function(){
			self.model.goTo( self.model.getActualIndex() - 1 )
		}) 
		this.view.on('random-clicked', function(){
			self.model.setRandom( !self.model.isRandom())
		})

		// Inicializacion
		this.model.setSongs([
			{
				name: 'Get lucky',
				artist: 'Daft Punk ft.Pharrell Williams & Nile Rodgers',
				src: 'media/Daft_Punk-Get_Lucky.mp3',
				img: 'img/songs/Get_lucky_daft_punk-thumbnail.jpg',
				cover: 'img/songs/Get_lucky_daft_punk-cover.jpg'
			},
			{
				name: 'Instant crush',
				artist: 'Daft Punk',
				src: 'media/Daft_Punk-Instant_Crush_ft_ Julian_Casablancas.mp3',
				img: 'img/songs/Instant_chrus_daft_punk-thumbnail.jpg',
				cover: 'img/songs/Instant_chrus_daft_punk-cover.jpg'	
			},
			{
				name: 'Bonito',
				artist: 'Jarabe de palo',
				src: 'media/Jarabe_De_Palo-Bonito.mp3',
				img: 'img/songs/Bonito_Jarabe_de_palo-thumbnail.jpg',
				cover: 'img/songs/Bonito_Jarabe_de_palo-cover.jpg'
			},
			{
				name: 'Como le gusta a tu cuerpo',
				artist: 'Carlos Vives',
				src: 'media/Como_Le_Gusta_A_Tu_Cuerpo-Carlos Vives_ft_ Michel-Teló.mp3',
				img: 'img/songs/Como_le_gusta_a_tu_cuerpo_Carlos_vives-thumbnail.jpg',
				cover: 'img/songs/Como_le_gusta_a_tu_cuerpo_Carlos_vives-cover.jpg'
			}
		])

		this.model.setActive( 0 )
	}
}

controller.init()
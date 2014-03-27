function Observable(){}

Observable.prototype = {
	/**
	 * Initializes the events
	 */
	_initEvents: function(){
		if( this._events ) return
		this._events = {
			all: []
		}

	},

	/**
	 * Adds an observer
	 * @param  {String}   	evt      	event name
	 * @param  {Function} 	callback 	calback function
	 * @param  {Object}		context		the referenced this
	 * @return {Observable} this
	 */
	on: function(evt, callback, context){
		evt = evt || 'all'

		this._initEvents()
		
		if(!this._events[ evt ])
			this._events[ evt ] = []

		this._events[ evt ].push({ 
				cb: callback, 
				ctx: context 
			})

		return this
	},

	/**
	 * Removes an observer (callback) from
	 * the specified event list
	 * @param  {String}   	evt      	event name
	 * @param  {Function} 	callback 	calback function
	 * @param  {Object}		context		the referenced this
	 * @return {Observable} this
	 */
	off: function(evt, callback, context){
		var callbacks, i, tuple

		evt = evt || 'all'

		this._initEvents()

		callbacks = this._events[evt]

		if( !callbacks ) return this

		for( i = callbacks.length; i--; ){
			tuple = callbacks[i]
			if( tuple.cb == callback && tuple.ctx == context ){
				callbacks.splice( i, 1 )
				return this
			}
		}

		return this
	},

	/**
	 * Fires the event. Callable with any numer of arguments,
	 * but first the event name
	 * @param  {String} evt the event name
	 */
	trigger: function( evt ){
		this._initEvents()
		

		var callbacks = this._events[ evt ],
			i, tuple

		if( callbacks ) for( i = callbacks.length; i--; ){
			tuple = callbacks[i]
			tuple.cb.apply( tuple.ctx, arguments )
		}
		
		// Those subscribed to all events shall be notified
		// allways
		if( evt != 'all' ){
			callbacks = this._events[ 'all' ]

			for( i = callbacks.length; i--; ){
				tuple = callbacks[i]
				tuple.cb.apply( tuple.ctx, arguments )
			}
		}	
		return this
	}
}
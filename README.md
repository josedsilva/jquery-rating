# A jQuery star rating plugin
This is a Javascript star rating plugin built as a jQuery widget. Portions of the code is copied from
https://github.com/callmenick/five-star-rating. Some additional functionality has been added.


## Installation
* Download the archive and extract.
* Link to [jQuery](https://jquery.com/download/), `jquery.rating.js` and the css file `rating.css`
* Image sprite should be in `img/stars.svg`. You can edit the css appropriately to use a different image or path.
* See the provided demo file `index.html` for a working demo.

## Basic structure

```html
...

<ul class="c-rating" id="my-rating"></ul>

...

<script>
$("#my-rating").rating();
</script>
```

## Options
You can either set options on the element itself with the "data" attribute or pass them to the function.

Following are the options:

* `rating` - Initial rating value when the plugin is initialized. (default: 0)
* `stars` - The number of stars to show. (default: 5)
* `readonly` - Whether to disable user interaction with the plugin? (default: false)
* `round` - The rounding algorithm to use (floor, ceil, round, half). (default: ceil)

Example:
```html
<ul class="c-rating" id="my-rating" data-rating="3.4" data-readonly="1" data-round="half"></ul>

<script>
$("#my-rating").rating();
</script>
```

You could also do this:

```html

<ul class="c-rating" id="my-rating"></ul>

<script>
$("#my-rating").rating({
	rating: 3.4,
	readonly: true,
	round: 'half'
});
</script>
```

## Events
The widget fires custom events on the element. These are the events fired:
* `rating:ready` - When the widget is initialized.
* `rating:mouseover` - When the mouse is over a star.
* `rating:mouseout` - When the mouse has left a star.
* `rating:click` - When a star is clicked.
* `rating:change` - When the new value of the widget is different from the previous one.

## Public functions
You can get the widget instance with the `getRating` method.

```javascript
var $widget = $("#my-rating").getRating();
```

You can then call the following public methods on the `$widget` object:
* setRating()
* getRating()
* setReadonly()

## Author
Jose F. D'Silva

## License

GNU LESSER GENERAL PUBLIC LICENSE

Version 3, 29 June 2007

https://www.gnu.org/licenses/lgpl-3.0.txt

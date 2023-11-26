import groq from "groq";

export const postsQuery = groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc){
	...,
	"id": _id,
	"headline": headline[_key == $locale][0].value,
	"excerpt": excerpt[_key == $locale][0].value,
}`;

export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0]{
	_createdAt,
	_updatedAt,
	mainImage,
	"seo": seo[_key == $locale][0].value,
	"headline": headline[_key == $locale][0].value,
	"body": body[_key == $locale][0].value,
}`;

export const pageByRouteQuery = groq`
*[
	_type == "page" &&
	route.current == $route
][0]{
	"seo": seo[_key == $locale][0].value,
	template,
	route,
	"headline": headline[_key == $locale && ^.template == "0"][0].value,
	"body": body[_key == $locale && ^.template == "0"][0].value,
 "stage":	stage->{
		title,
		darkImage,
		lightImage,
		fit,
		bgcolor,
		"headline": headline[_key == $locale][0].value,
		"subtitle": subtitle[_key == $locale][0].value,
		aboveTheFold,
		"cta": cta{
			href,
			"label": label[_key == $locale][0].value,
			noFollow
		}
	},
	"items": *[_type == ^.items] | order(_createdAt desc)[0...30]{
		"id": _id,
		_type,
		"headline": headline[_key == $locale][0].value,
		"mainImage": mainImage{
			...
		},
		"excerpt": excerpt[_key == $locale][0].value,
		"slug": slug.current
	},
	"slots": slots[^.template == "1"]{
		_type,
		"id": _key,
		...select(
			_type == "slideshow" => {
				...@->{
					"slides": slides[]{
						_type,
						...select(
							_type == "post" => {
								...@->{
									"headline": headline[_key == $locale][0].value,
									"slug": slug.current,
									"mainImage": mainImage{
										...
									},
								}
							},
							_type == "stage" => {
								...@->{
									"darkImage": darkImage{
										...
									},
									"lightImage": lightImage{
										...
									},
									"headline": headline[_key == $locale][0].value,
									"subtitle": subtitle[_key == $locale][0].value,
									aboveTheFold,
									"cta": cta{
										href,
										"label": label[_key == $locale][0].value,
										noFollow
									}
								}
							}
						)
					}
				}
			},
			_type == "tiles" => {
				...@->{
					color,
					variant,
					"items": items[]{
						_type,
						"id": _key,
						...@->{
							"body": [body[_key == $locale].value][0][0],
						}
					}
				}
			},
			_type == "simpleText" =>{
				...@->{
					"text": [text[_key == $locale].value][0][0],
					level,
					component,
					alignment
				}
			},
			_type == "richText" =>{
				...@->{
					"body": [body[_key == $locale].value][0][0],
				}
			},
			_type == "link" => {
				...@->{
						"route": route.current,
						"label": label[_key == $locale][0].value
				}
			},
			_type == "promoted" => {
				...@->{
					type,
					"headline": headline[_key == $locale][0].value,
					"entries": *[_type == ^.type] | order(_createdAt desc)[0...3]{
						"id": _id,
						"headline": headline[_key == $locale][0].value,
						"mainImage": mainImage{
							...
						},
						"excerpt": excerpt[_key == $locale][0].value,
						"slug": slug.current
					}
				}
			},
			_type == "spotlight" => {
				_type,
				...@->{
					"entryType": entry->_type,
					"headline": coalesce(headline[_key == $locale][0].value, entry->headline[_key == $locale][0].value),
					"mainImage": coalesce(mainImage, entry->mainImage),
					"excerpt": coalesce(excerpt[_key == $locale][0].value, entry->excerpt[_key == $locale][0].value),
					"cta": cta->route.current,
					"slug": entry->slug.current,
				},
			},
			_type == "person" => {
				_type,
				...@->{
					firstName,
					lastName,
					"pronouns": pronouns[_key == $locale][0].value,
					position,
					linkedin,
					github,
					"mainImage": coalesce(mainImage, entry->mainImage),
					"biography": biography[_key == $locale][0].value,
				},
			},
			_type == "spotImage" => {
				_type,
				...@->{
					"mainImage": mainImage{
						...
					},
				},
			},
		)
	}
}
`;

export const navigationQuery = groq`
*[
_type == "navigation" &&
section.current == $section
][0]{
	title,
	"links": links[]{
		...select(
			_type == "page" => {
				"page": *[_id == ^._ref][0]{
					"route": route.current,
					"label": label[_key == $locale][0].value
				}
			},
			_type == "navigation" => {
				"navigation": *[_id == ^._ref][0]{
					"label": parent -> label[_key == $locale][0].value,
					"route": parent -> route.current,
					"links": links[]{
						"page": *[_type == "page" && _id == ^._ref][0]{
							"route": route.current,
							"label": label[_key == $locale][0].value
						}
					}
				}
			}
		)
	}
}
`;

export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`;

export const pageRoutesQuery = groq`
*[_type == "page" && defined(route.current)][].route.current
`;

export const pageRoutesSeoQuery = groq`
*[_type == "page" && defined(route.current)][]{
		_updatedAt,
		"seo": seo[].value,
		"route": route.current,
}
`;

export const postRoutesSeoQuery = groq`
*[_type == "post" && defined(slug.current)][]{
		_updatedAt,
		"seo": seo[].value,
		"slug": slug.current,
}
`;

export const pageRouteQuery = groq`
*[_type == "page" &&
	route.current match $route
	&& defined(route.current)
][].route.current
`;

export const addressQuery = groq`
*[
	_type == "address" &&
	section.current == $section
][0]{
	name,
	section,
	streetName,
	houseNumber,
	addressExtra,
	zip,
	city,
	province,
	country,
	notes,
	email,
	phone
}
`;

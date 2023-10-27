import groq from "groq";

export const postsQuery = groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc)`;

export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0]`;

export const pageByRouteQuery = groq`
*[
	_type == "page" &&
	route.current == $route
][0]{
	headline[_key == $locale]{
		value
	},
	seo[_key == $locale]{
		value
	},
	body[_key == $locale]{
		value
	}
}
`;

export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`;

export const pageRouteQuery = groq`
*[_type == "page" &&
	route.current match $route
	&& defined(route.current)
][].route.current
`;

export const navigationQuery = groq`
*[
_type == "navigation" &&
section.current == $section
][0]{
  title,
  "links": links[]{
    "page": *[_type == "page" && _id == ^._ref][0]{
      "route": route.current,
      "label": label[_key == $locale][0].value
    }
  }
}
`;

export const addressQuery = groq`
*[
  _type == "address" &&
  section.current == $section
][0]{
  title,
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

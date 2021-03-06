﻿using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Formatting;
using System.Net.Http.Headers;
using System.Web.Http;

namespace YelpExplorer.Web
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();

            //commented default route for routing conflict

            //config.Routes.MapHttpRoute(
            //    name: "DefaultApi",
            //    routeTemplate: "api/{controller}/{id}",
            //    defaults: new { id = RouteParameter.Optional }
            //);

            config.Routes.MapHttpRoute(
               name: "PlacesRoute",
               routeTemplate: "api/{controller}/{userName}",
               defaults: new { userName = RouteParameter.Optional }
            );

            config.Routes.MapHttpRoute(
              name: "RepliesRoute",
              routeTemplate: "api/topics/{topicid}/replies/{id}",
              defaults: new { controller = "replies", id = RouteParameter.Optional }
            );

            //config.Routes.MapHttpRoute(
            //   name: "PlacesRoute",
            //   routeTemplate: "api/places/{userName}",
            //   defaults: new { controller = "places", userName = RouteParameter.Optional }
            //);

            //config.Routes.MapHttpRoute(
            //   name: "UsersRoute",
            //   routeTemplate: "api/users/{userName}",
            //   defaults: new { controller = "users" }
            //);

            var jsonFormatter = config.Formatters.OfType<JsonMediaTypeFormatter>().First();
            jsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();

            config.Formatters.JsonFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("text/html"));

            GlobalConfiguration.Configuration.Formatters.JsonFormatter.SerializerSettings.ReferenceLoopHandling =
                Newtonsoft.Json.ReferenceLoopHandling.Ignore;

        }
    }
}

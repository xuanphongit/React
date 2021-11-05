import * as signalR from "@microsoft/signalr";

export const getHubConnection = (hubUrl) => {
  // Builds the SignalR connection, mapping it to hubUrl
  const hubConnection = new signalR.HubConnectionBuilder()
    .withUrl(hubUrl, {
      withCredentials: false
    })
    .configureLogging(signalR.LogLevel.Information)
    .build();

  return hubConnection
}

export const startConnection = (hubUrl) => {
  const hubConnection = getHubConnection(hubUrl)

  // Starts the SignalR connection
  hubConnection
    .start()
    .then(() => console.log('Connection started!'))
    .catch(err => console.log('Connection Fail' + err));

  return hubConnection
}
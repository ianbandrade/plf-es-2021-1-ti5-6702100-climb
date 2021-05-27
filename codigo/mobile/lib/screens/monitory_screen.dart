import 'package:flutter/material.dart';
import 'package:mobile/models/DashboardData.dart';
import 'package:mobile/models/monitory_application.dart';
import 'package:mobile/models/request.dart';
import 'package:mobile/widgets/change_theme_widget.dart';
import 'package:mobile/widgets/charts/gauge_chart.dart';
import 'package:mobile/widgets/charts/horizontal_bar_chart.dart';
import 'package:mobile/widgets/charts/pie_chart.dart';
import 'package:mobile/widgets/logo.dart';
import 'package:charts_flutter/flutter.dart' as charts;
import 'package:socket_io_client/socket_io_client.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

class MonitoryPage extends StatefulWidget {
  @override
  _MonitoryPageState createState() => _MonitoryPageState();
}

class _MonitoryPageState extends State<MonitoryPage> {
  int connectionsNumber = 0;
  String appName;
  Map<String, String> responseStatusCode = {
    "2XX": "0",
    "4XX": "0",
    "5XX": "0",
  };

  Map<String, String> averageRequestTime = {
    "GET": "???",
    "POST": "???",
    "PUT": "???",
    "PATCH": "???",
    "DELETE": "???"
  };

  DashboardData dashboard;
  Socket socket;
  @override
  void initState() {
    super.initState();
    connectToServer();
  }

  void connectToServer() {
    try {
      // Configure socket transports must be sepecified
      socket = io('http://${env["API_HOST"]}/applications', <String, dynamic>{
        'transports': ['websocket'],
        'autoConnect': false,
      });

      // Connect to websocket
      socket.connect();
      socket.emit('message', appName);
      // Handle socket events
      socket.on('connect', (_) => print('connect: ${socket.id}'));
      socket.on('message', (data) => getAppStaticsData(data));
      socket.on('disconnect', (_) => print('disconnect'));
    } catch (e) {
      print(e.toString());
    }
  }

  getAppStaticsData(data) {
    setState(() {
      dashboard = DashboardData.fromJson(data);
      if (dashboard.results.openConnections.length > 0)
        connectionsNumber =
            int.tryParse(dashboard.results.openConnections[0].value[1]) ?? 0;
      responseStatusCode = getReponseStatusCode(dashboard);
      averageRequestTime = getAvgResponseTimeByMethod(dashboard);
    });
  }

  @override
  Widget build(BuildContext context) {
    MonitoryApplication routeData = ModalRoute.of(context).settings.arguments;
    setState(() {
      appName = routeData.appName;
    });

    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        leading: IconButton(
          icon: Icon(Icons.arrow_back),
          onPressed: () {
            socket.disconnect();
            Navigator.of(context).pop();
          },
        ),
        title: Center(
          child: Logo(
            imageHeight: 20,
            textStyle: Theme.of(context).textTheme.headline6,
          ),
        ),
        actions: [ChangeThemeSwitch()],
      ),
      body: ListView(
        children: [
          Column(
            children: [
              Text(
                appName,
                style: Theme.of(context).textTheme.headline3,
              ),
              GaugeChart(
                value: connectionsNumber,
                seriesList: createGaugeData(connectionsNumber),
                chartTitle: 'Quantidade de Conexões',
                animate: true,
              ),
              SimplePieChart(
                seriesList: createDataPie(responseStatusCode),
                animate: true,
                charTitle: 'Status code',
              ),
              HorizontalBarChart(
                seriesList: createDataBarChart(averageRequestTime),
                animate: true,
                chartTitle: 'Tempo médio de resposta',
              ),
            ],
          ),
        ],
      ),
    );
  }

  static Map<String, String> getReponseStatusCode(DashboardData dashboard) {
    Map<String, String> auxResponseStatusCode = {
      "2XX": "0",
      "4XX": "0",
      "5XX": "0",
    };
    dashboard.results.responseStatusCode.forEach((item) =>
        auxResponseStatusCode[item.metric['statusCode']] = item.value[1]);
    return auxResponseStatusCode;
  }

  static Map<String, String> getAvgResponseTimeByMethod(
      DashboardData dashboard) {
    Map<String, String> auxAverageRequestTime = {
      "GET": "???",
      "POST": "???",
      "PUT": "???",
      "PATCH": "???",
      "DELETE": "???"
    };

    dashboard.results.averageRequestTime.forEach((item) =>
        auxAverageRequestTime[item.metric['method']] =
            item.value[1] == "NaN" ? "???" : item.value[1]);
    return auxAverageRequestTime;
  }

  static List<charts.Series<Request, String>> createDataPie(
      Map<String, String> responseCodes) {
    List<Request> data = [];
    responseCodes.forEach((key, value) {
      Color color = Colors.green;

      if (key == '4XX')
        color = Colors.orange;
      else if (key == '5XX') {
        color = Colors.red;
      }
      final Request request =
          new Request(code: key, quantity: value, color: color);
      data.add(request);
    });

    return [
      new charts.Series<Request, String>(
        id: 'Sales',
        domainFn: (Request sales, _) => sales.code,
        measureFn: (Request sales, _) =>
            int.tryParse(
              sales.quantity,
            ) ??
            '??',
        colorFn: (Request segment, _) =>
            charts.ColorUtil.fromDartColor(segment.color),
        data: data,
      )
    ];
  }

  static List<charts.Series<GaugeSegment, String>> createGaugeData(
      int connectionsNumber) {
    int value = 180 - connectionsNumber;
    if (value < 0) {
      value = 0;
    }
    final data = [
      new GaugeSegment(segment: 'Full', size: value, color: Colors.grey)
    ];

    if (connectionsNumber <= 100) {
      data.insert(
          0,
          new GaugeSegment(
              segment: 'Green', size: connectionsNumber, color: Colors.green));
    } else if (connectionsNumber <= 130) {
      data.insert(
          0,
          new GaugeSegment(
              segment: 'Yellow',
              size: connectionsNumber,
              color: Colors.yellow));
    } else if (connectionsNumber <= 150) {
      data.insert(
          0,
          new GaugeSegment(
              segment: 'Orange',
              size: connectionsNumber,
              color: Colors.orange));
    } else {
      data.insert(
          0,
          new GaugeSegment(
              segment: 'Red', size: connectionsNumber, color: Colors.red));
    }

    return [
      new charts.Series<GaugeSegment, String>(
        id: 'Segments',
        domainFn: (GaugeSegment segment, _) => segment.segment,
        measureFn: (GaugeSegment segment, _) => segment.size,
        colorFn: (GaugeSegment segment, _) =>
            charts.ColorUtil.fromDartColor(segment.color),
        data: data,
      )
    ];
  }

  static String convertMillisecondsToSeconds(double milliseconds) {
    String formater = 's';
    if (milliseconds < 1000) {
      formater = 'ms';
      return '${milliseconds.toStringAsFixed(2)}$formater'.replaceAll('.', ',');
    }
    double seconds = milliseconds / 1000;
    if (seconds > 60) {
      seconds = seconds / 60;
      formater = 'm';
    }

    return '${seconds.toStringAsFixed(2)}$formater'.replaceAll('.', ',');
  }

  static List<charts.Series<Request, String>> createDataBarChart(
      Map<String, String> averageRequestTime) {
    List<Request> globalSalesData = [];
    averageRequestTime.forEach((key, value) {
      globalSalesData.add(new Request(method: key, avgResponsTime: value));
    });

    return [
      new charts.Series<Request, String>(
        id: 'Global Revenue',
        domainFn: (Request request, _) => request.method,
        measureFn: (Request request, _) =>
            double.tryParse(request.avgResponsTime) ?? 0,
        data: globalSalesData,
        labelAccessorFn: (Request request, _) => request.avgResponsTime != 'NaN'
            ? '${convertMillisecondsToSeconds(double.tryParse(request.avgResponsTime) ?? 0)}'
            : '10',
      )
    ];
  }
}

class GaugeSegment {
  final String segment;
  final int size;
  final Color color;

  GaugeSegment({this.segment, this.size, this.color});
}

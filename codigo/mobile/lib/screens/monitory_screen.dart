import 'package:flutter/material.dart';
import 'package:mobile/models/cpu.dart';
import 'package:mobile/models/monitory_application.dart';
import 'package:mobile/models/request.dart';
import 'package:mobile/widgets/change_theme_widget.dart';
import 'package:mobile/widgets/charts/gauge_chart.dart';
import 'package:mobile/widgets/charts/horizontal_bar_chart.dart';
import 'package:mobile/widgets/charts/line_chart.dart';
import 'package:mobile/widgets/charts/pie_chart.dart';
import 'package:mobile/widgets/logo.dart';
import 'package:charts_flutter/flutter.dart' as charts;
import 'package:intl/intl.dart';

class MonitoryPage extends StatefulWidget {
  @override
  _MonitoryPageState createState() => _MonitoryPageState();
}

class _MonitoryPageState extends State<MonitoryPage> {
  @override
  Widget build(BuildContext context) {
    final MonitoryApplication routeData =
        ModalRoute.of(context).settings.arguments;

    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        leading: IconButton(
          icon: Icon(Icons.arrow_back),
          onPressed: () => Navigator.of(context).pop(),
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
                routeData.appName,
                style: Theme.of(context).textTheme.headline3,
              ),
              SimplePieChart(
                seriesList: createDataPie(),
                animate: true,
                charTitle: 'Status code',
              ),
              HorizontalBarChart(
                seriesList: createDataBarChart(),
                animate: true,
                chartTitle: 'Tempo médio de resposta',
              ),
              GaugeChart(
                value: 150,
                seriesList: createGaugeData(150),
                chartTitle: 'Quantidade de Conexões',
                animate: true,
              )
            ],
          ),
        ],
      ),
    );
  }

  static List<charts.Series<Request, int>> createDataPie() {
    final data = [
      new Request(code: 200, quantity: 63000, color: Colors.green),
      new Request(code: 400, quantity: 2300, color: Colors.orange),
      new Request(code: 500, quantity: 0, color: Colors.red),
    ];

    return [
      new charts.Series<Request, int>(
        id: 'Sales',
        domainFn: (Request sales, _) => sales.code,
        measureFn: (Request sales, _) => sales.quantity,
        colorFn: (Request segment, _) =>
            charts.ColorUtil.fromDartColor(segment.color),
        data: data,
      )
    ];
  }

  static List<charts.Series<GaugeSegment, String>> createGaugeData(int value) {
    final data = [
      new GaugeSegment(segment: 'Full', size: 180 - value, color: Colors.grey)
    ];

    if (value < 100) {
      data.insert(0,
          new GaugeSegment(segment: 'Green', size: value, color: Colors.green));
    } else if (value < 130) {
      data.insert(
          0,
          new GaugeSegment(
              segment: 'Yellow', size: value, color: Colors.yellow));
    } else if (value < 150) {
      data.insert(
          0,
          new GaugeSegment(
              segment: 'Orange', size: value, color: Colors.orange));
    } else {
      data.insert(
          0, new GaugeSegment(segment: 'Red', size: value, color: Colors.red));
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
    double seconds = milliseconds / 1000;
    String formater = 's';
    if (seconds > 60) {
      seconds = seconds / 60;
      formater = 'm';
    }

    return '${seconds.toStringAsFixed(2)}$formater'.replaceAll('.', ',');
  }

  static List<charts.Series<Request, String>> createDataBarChart() {
    final globalSalesData = [
      new Request(method: 'GET', avgResponsTime: 10006.944860000001),
      new Request(method: 'POST', avgResponsTime: 12055),
      new Request(method: 'DELETE', avgResponsTime: 17000),
      new Request(method: 'PUT', avgResponsTime: 63000),
      new Request(method: 'PATCH', avgResponsTime: 20000),
    ];

    return [
      new charts.Series<Request, String>(
        id: 'Global Revenue',
        domainFn: (Request sales, _) => sales.method,
        measureFn: (Request sales, _) => sales.avgResponsTime,
        data: globalSalesData,
        labelAccessorFn: (Request request, _) =>
            '${convertMillisecondsToSeconds(request.avgResponsTime)}',
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

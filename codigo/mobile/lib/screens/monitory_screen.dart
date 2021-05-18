import 'package:flutter/material.dart';
import 'package:mobile/models/cpu.dart';
import 'package:mobile/models/monitory_application.dart';
import 'package:mobile/widgets/change_theme_widget.dart';
import 'package:mobile/widgets/chart.dart';
import 'package:mobile/widgets/logo.dart';
import 'package:charts_flutter/flutter.dart' as charts;

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
              StackedAreaCustomColorLineChart(
                seriesList: _createSampleData(),
                animate: true,
                chartTitle: 'Consumo de CPU',
              ),
              StackedAreaCustomColorLineChart(
                seriesList: _createSampleData(),
                animate: true,
                chartTitle: 'Consumo de Memória',
              ),
              StackedAreaCustomColorLineChart(
                seriesList: _createSampleData(),
                animate: true,
                chartTitle: 'Consumo de Memória',
              )
            ],
          ),
        ],
      ),
    );
  }

  static List<charts.Series<CPU, DateTime>> _createSampleData() {
    var myFakeMobileData = [
      new CPU(cpuUsed: 25, time: new DateTime(2018, 8, 22, 17, 05, 00)),
      new CPU(cpuUsed: 12, time: new DateTime(2018, 8, 22, 17, 10, 00)),
      new CPU(cpuUsed: 45, time: new DateTime(2018, 8, 22, 17, 15, 00)),
      new CPU(cpuUsed: 30, time: new DateTime(2018, 8, 22, 17, 20, 00)),
      new CPU(cpuUsed: 80, time: new DateTime(2018, 8, 22, 17, 25, 00))
    ];

    return [
      new charts.Series<CPU, DateTime>(
        id: 'Mobile',

        // colorFn specifies that the line will be green.
        colorFn: (_, __) => charts.MaterialPalette.green.shadeDefault,
        // areaColorFn specifies that the area skirt will be light green.
        areaColorFn: (_, __) =>
            charts.MaterialPalette.green.shadeDefault.lighter,
        domainFn: (CPU sales, _) => sales.time,
        measureFn: (CPU sales, _) => sales.cpuUsed,
        data: myFakeMobileData,
      )
    ];
  }
}

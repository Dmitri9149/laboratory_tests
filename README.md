This is app to test my coding skills 

The test specification: 



Laboratory test collection consists of multiple different measurements

Laboratory function needs a simple tool to maintain their laboratory test collection

Laboratory test consists of ID, name, unit, reference interval (min and max range for "good values")

For example:

1; Hemoglobin; g/l; 134; 167

2; LDL-Cholestrol; mmol/l; 0; 3

 

Implement a REST-API which has following features:

* Get laboratory tests

* Add new laboratory test

* Modify existing laboratory test

* Remove laboratory test

 

Implement a way to save this information (light implementation like sqlite or text file)

Implement a UI to perform these functions and to check if value given in UI is between reference interval or not

 

Try to create easy-to-understand code and try to use existing components and consider writing tests
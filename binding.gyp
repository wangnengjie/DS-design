{
  "targets": [
    {
      "target_name": "addon",
      "cflags!": [ "-fno-exceptions" ],
      "cflags_cc!": [ "-fno-exceptions" ],
      "sources": [ "./addon/addon.cc",
                   "./addon/src/core/final/Cnf.cc",
                   "./addon/src/core/final/Dpll.cc",
                   "./addon/src/core/final/Clause.cc"
                 ],
      "include_dirs": [
        "<!@(node -p \"require('node-addon-api').include\")",
        "./addon"
      ],
      'defines': [ 'NAPI_DISABLE_CPP_EXCEPTIONS' ],
    }
  ]
}

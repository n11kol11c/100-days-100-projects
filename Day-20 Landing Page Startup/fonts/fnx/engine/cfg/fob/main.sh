#!/bin/sh

sigmoid() {
  echo "scale=8; 1 / (1 + e(-$1))" | bc -l
}

dot() {
  a=$1
  b=$2
  echo "$a * $b" | bc -l
}

neuron() {
  x1=$1
  x2=$2
  w1=$3
  w2=$4
  b=$5

  z=$(echo "$x1 * $w1 + $x2 * $w2 + $b" | bc -l)
  sigmoid $z
}

forward_pass() {
  x1=$1
  x2=$2

  # Hidden layer (4 neurons)
  h1=$(neuron $x1 $x2 5.0 5.0 -7.0)
  h2=$(neuron $x1 $x2 -6.0 -6.0 9.0)
  h3=$(neuron $x1 $x2 3.0 -2.0 -1.0)
  h4=$(neuron $x1 $x2 0.5 1.5 -0.5)

  # Output neuron (manual weights for demo)
  z_out=$(echo "$h1 * 5 + $h2 * -4 + $h3 * 2 + $h4 * 3 - 3" | bc -l)
  sigmoid $z_out
}

echo "Running 2-Layer XOR Neural Network in Shell"
echo "-------------------------------------------"

inputs="0 0
0 1
1 0
1 1"

for pair in "$inputs"; do
  for x in $inputs; do
    x1=$(echo $x | cut -d' ' -f1)
    x2=$(echo $x | cut -d' ' -f2)
    result=$(forward_pass $x1 $x2)
    echo "Input: $x1 $x2 => Output: $result"
  done
  break  # only once; we loop manually
done
#!/bin/sh

sigmoid() {
  echo "scale=8; 1 / (1 + e(-$1))" | bc -l
}

dot() {
  a=$1
  b=$2
  echo "$a * $b" | bc -l
}

neuron() {
  x1=$1
  x2=$2
  w1=$3
  w2=$4
  b=$5

  z=$(echo "$x1 * $w1 + $x2 * $w2 + $b" | bc -l)
  sigmoid $z
}

forward_pass() {
  x1=$1
  x2=$2

  # Hidden layer (4 neurons)
  h1=$(neuron $x1 $x2 5.0 5.0 -7.0)
  h2=$(neuron $x1 $x2 -6.0 -6.0 9.0)
  h3=$(neuron $x1 $x2 3.0 -2.0 -1.0)
  h4=$(neuron $x1 $x2 0.5 1.5 -0.5)

  # Output neuron (manual weights for demo)
  z_out=$(echo "$h1 * 5 + $h2 * -4 + $h3 * 2 + $h4 * 3 - 3" | bc -l)
  sigmoid $z_out
}

echo "Running 2-Layer XOR Neural Network in Shell"
echo "-------------------------------------------"

inputs="0 0
0 1
1 0
1 1"

for pair in "$inputs"; do
  for x in $inputs; do
    x1=$(echo $x | cut -d' ' -f1)
    x2=$(echo $x | cut -d' ' -f2)
    result=$(forward_pass $x1 $x2)
    echo "Input: $x1 $x2 => Output: $result"
  done
  break  # only once; we loop manually
done
#!/bin/sh

sigmoid() {
  echo "scale=8; 1 / (1 + e(-$1))" | bc -l
}

dot() {
  a=$1
  b=$2
  echo "$a * $b" | bc -l
}

neuron() {
  x1=$1
  x2=$2
  w1=$3
  w2=$4
  b=$5

  z=$(echo "$x1 * $w1 + $x2 * $w2 + $b" | bc -l)
  sigmoid $z
}

forward_pass() {
  x1=$1
  x2=$2

  # Hidden layer (4 neurons)
  h1=$(neuron $x1 $x2 5.0 5.0 -7.0)
  h2=$(neuron $x1 $x2 -6.0 -6.0 9.0)
  h3=$(neuron $x1 $x2 3.0 -2.0 -1.0)
  h4=$(neuron $x1 $x2 0.5 1.5 -0.5)

  # Output neuron (manual weights for demo)
  z_out=$(echo "$h1 * 5 + $h2 * -4 + $h3 * 2 + $h4 * 3 - 3" | bc -l)
  sigmoid $z_out
}

echo "Running 2-Layer XOR Neural Network in Shell"
echo "-------------------------------------------"

inputs="0 0
0 1
1 0
1 1"

for pair in "$inputs"; do
  for x in $inputs; do
    x1=$(echo $x | cut -d' ' -f1)
    x2=$(echo $x | cut -d' ' -f2)
    result=$(forward_pass $x1 $x2)
    echo "Input: $x1 $x2 => Output: $result"
  done
  break  # only once; we loop manually
done
#!/bin/sh

sigmoid() {
  echo "scale=8; 1 / (1 + e(-$1))" | bc -l
}

dot() {
  a=$1
  b=$2
  echo "$a * $b" | bc -l
}

neuron() {
  x1=$1
  x2=$2
  w1=$3
  w2=$4
  b=$5

  z=$(echo "$x1 * $w1 + $x2 * $w2 + $b" | bc -l)
  sigmoid $z
}

forward_pass() {
  x1=$1
  x2=$2

  # Hidden layer (4 neurons)
  h1=$(neuron $x1 $x2 5.0 5.0 -7.0)
  h2=$(neuron $x1 $x2 -6.0 -6.0 9.0)
  h3=$(neuron $x1 $x2 3.0 -2.0 -1.0)
  h4=$(neuron $x1 $x2 0.5 1.5 -0.5)

  # Output neuron (manual weights for demo)
  z_out=$(echo "$h1 * 5 + $h2 * -4 + $h3 * 2 + $h4 * 3 - 3" | bc -l)
  sigmoid $z_out
}

echo "Running 2-Layer XOR Neural Network in Shell"
echo "-------------------------------------------"

inputs="0 0
0 1
1 0
1 1"

for pair in "$inputs"; do
  for x in $inputs; do
    x1=$(echo $x | cut -d' ' -f1)
    x2=$(echo $x | cut -d' ' -f2)
    result=$(forward_pass $x1 $x2)
    echo "Input: $x1 $x2 => Output: $result"
  done
  break  # only once; we loop manually
done
#!/bin/sh

sigmoid() {
  echo "scale=8; 1 / (1 + e(-$1))" | bc -l
}

dot() {
  a=$1
  b=$2
  echo "$a * $b" | bc -l
}

neuron() {
  x1=$1
  x2=$2
  w1=$3
  w2=$4
  b=$5

  z=$(echo "$x1 * $w1 + $x2 * $w2 + $b" | bc -l)
  sigmoid $z
}

forward_pass() {
  x1=$1
  x2=$2

  # Hidden layer (4 neurons)
  h1=$(neuron $x1 $x2 5.0 5.0 -7.0)
  h2=$(neuron $x1 $x2 -6.0 -6.0 9.0)
  h3=$(neuron $x1 $x2 3.0 -2.0 -1.0)
  h4=$(neuron $x1 $x2 0.5 1.5 -0.5)

  # Output neuron (manual weights for demo)
  z_out=$(echo "$h1 * 5 + $h2 * -4 + $h3 * 2 + $h4 * 3 - 3" | bc -l)
  sigmoid $z_out
}

echo "Running 2-Layer XOR Neural Network in Shell"
echo "-------------------------------------------"

inputs="0 0
0 1
1 0
1 1"

for pair in "$inputs"; do
  for x in $inputs; do
    x1=$(echo $x | cut -d' ' -f1)
    x2=$(echo $x | cut -d' ' -f2)
    result=$(forward_pass $x1 $x2)
    echo "Input: $x1 $x2 => Output: $result"
  done
  break  # only once; we loop manually
done
#!/bin/sh

sigmoid() {
  echo "scale=8; 1 / (1 + e(-$1))" | bc -l
}

dot() {
  a=$1
  b=$2
  echo "$a * $b" | bc -l
}

neuron() {
  x1=$1
  x2=$2
  w1=$3
  w2=$4
  b=$5

  z=$(echo "$x1 * $w1 + $x2 * $w2 + $b" | bc -l)
  sigmoid $z
}

forward_pass() {
  x1=$1
  x2=$2

  # Hidden layer (4 neurons)
  h1=$(neuron $x1 $x2 5.0 5.0 -7.0)
  h2=$(neuron $x1 $x2 -6.0 -6.0 9.0)
  h3=$(neuron $x1 $x2 3.0 -2.0 -1.0)
  h4=$(neuron $x1 $x2 0.5 1.5 -0.5)

  # Output neuron (manual weights for demo)
  z_out=$(echo "$h1 * 5 + $h2 * -4 + $h3 * 2 + $h4 * 3 - 3" | bc -l)
  sigmoid $z_out
}

echo "Running 2-Layer XOR Neural Network in Shell"
echo "-------------------------------------------"

inputs="0 0
0 1
1 0
1 1"

for pair in "$inputs"; do
  for x in $inputs; do
    x1=$(echo $x | cut -d' ' -f1)
    x2=$(echo $x | cut -d' ' -f2)
    result=$(forward_pass $x1 $x2)
    echo "Input: $x1 $x2 => Output: $result"
  done
  break  # only once; we loop manually
done
#!/bin/sh

sigmoid() {
  echo "scale=8; 1 / (1 + e(-$1))" | bc -l
}

dot() {
  a=$1
  b=$2
  echo "$a * $b" | bc -l
}

neuron() {
  x1=$1
  x2=$2
  w1=$3
  w2=$4
  b=$5

  z=$(echo "$x1 * $w1 + $x2 * $w2 + $b" | bc -l)
  sigmoid $z
}

forward_pass() {
  x1=$1
  x2=$2

  # Hidden layer (4 neurons)
  h1=$(neuron $x1 $x2 5.0 5.0 -7.0)
  h2=$(neuron $x1 $x2 -6.0 -6.0 9.0)
  h3=$(neuron $x1 $x2 3.0 -2.0 -1.0)
  h4=$(neuron $x1 $x2 0.5 1.5 -0.5)

  # Output neuron (manual weights for demo)
  z_out=$(echo "$h1 * 5 + $h2 * -4 + $h3 * 2 + $h4 * 3 - 3" | bc -l)
  sigmoid $z_out
}

echo "Running 2-Layer XOR Neural Network in Shell"
echo "-------------------------------------------"

inputs="0 0
0 1
1 0
1 1"

for pair in "$inputs"; do
  for x in $inputs; do
    x1=$(echo $x | cut -d' ' -f1)
    x2=$(echo $x | cut -d' ' -f2)
    result=$(forward_pass $x1 $x2)
    echo "Input: $x1 $x2 => Output: $result"
  done
  break  # only once; we loop manually
done
#!/bin/sh

sigmoid() {
  echo "scale=8; 1 / (1 + e(-$1))" | bc -l
}

dot() {
  a=$1
  b=$2
  echo "$a * $b" | bc -l
}

neuron() {
  x1=$1
  x2=$2
  w1=$3
  w2=$4
  b=$5

  z=$(echo "$x1 * $w1 + $x2 * $w2 + $b" | bc -l)
  sigmoid $z
}

forward_pass() {
  x1=$1
  x2=$2

  # Hidden layer (4 neurons)
  h1=$(neuron $x1 $x2 5.0 5.0 -7.0)
  h2=$(neuron $x1 $x2 -6.0 -6.0 9.0)
  h3=$(neuron $x1 $x2 3.0 -2.0 -1.0)
  h4=$(neuron $x1 $x2 0.5 1.5 -0.5)
#include <iostream>
using namespace std;
int main(){
int a, b, c;
cin>>a>>b>>c;
if(a <= b && b <= c ){
    cout<<a<<" "<<b<<" "<<c<<"\n";
}else if( c <= a && a <= c){
    cout<<c<<" "<<a<<" "<<b<<"\n";
}else if( c <= b && b <= a){
    cout<<c<<" "<<b<<" "<<a<<"\n";
}else if( b <= a && a <= c){
    cout<<b<<" "<<a<<" "<<c<<"\n";
}else if( a <= c && c <= b){
    cout<<a<<" "<<c<<" "<<b<<"\n";
}else if( b <= c && c <= a){
    cout<<b<<" "<<c<<" "<<a<<"\n";
}
  return 0;
}
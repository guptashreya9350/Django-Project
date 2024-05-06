from django.contrib.auth.models import User, BaseUserManager, auth
from django.shortcuts import redirect, render
from django.http import HttpResponse
from django.contrib import messages
from trading_tool.models import StockTable
from django.http import JsonResponse




def home(request):
    return render(request, 'home.html')





def about(request):
    return render(request, 'about.html')  





def feedback(request):
    return render(request, 'feedback.html')


def login(request):
    if request.method=="POST" :
        name= request.POST['name']
        password= request.POST['password']

        puser= auth.authenticate(username=name, password=password)
        if puser is not None:
            auth.login(request, puser)
            return redirect('dashboard')
        else:
            messages.warning(request, "INVALID CREDENTIALS")
            return redirect('login')
    else:
        return render(request, 'login.html')





def handleregister(request):
    if request.method == 'POST' :
        fname= request.POST['fname']
        Uname= request.POST['Uname']
        email= request.POST['email']
        Pass1= request.POST['Pass1']

        if( (User.objects.filter(username=Uname).exists() ) and (User.objects.filter(email=email).exists() ) ):
            messages.warning(request, "E-mail or Username already used!")
            return redirect('register')
        else:
            myuser=User.objects.create_user(Uname, email, Pass1)
            myuser.first_name= fname
            myuser.save() 
            #print success message here
            return redirect('register_success')       
    else:
        return HttpResponse('Cannot load register page from here, please use /register')






def register_success(request):
    return render(request, 'register_success.html')




def addition(request):
    if request.method == 'POST' :
        name= request.POST['name']
        price= request.POST['price']
        quantity= request.POST['quantity']
        userfk=request.user 

        StockTable.objects.create(user=userfk, name=name, buyprice=price, quantity=quantity)
        # newentry.name = name 
        # newentry.buyprice = price
        # newentry.quantity = quantity
        #print success message here
        return redirect('dashboard')  

    else:
        return HttpResponse('Please Login first and add an entry from  the Dashboard')




#@login_required(login_url='login.html')
def dashboard(request):
    if request.user.is_authenticated:
        dataop = StockTable.objects.all().filter(user=request.user)
        tia=0
        tqo=0
        for i in dataop:
            tqo=tqo + i.quantity ;
            tia=tia + ( i.quantity*i.buyprice ) ;
        context = { 'tabledata' : dataop , 'amt' : tia , 'qty' : tqo }
        return render(request, 'dashboard.html' , context)
    else:
        return redirect('/login')


def get_chart_data(request):
    if request.user.is_authenticated:
        dataop = StockTable.objects.filter(user=request.user).values('name', 'quantity')
        chart_data = [{'iname': item['name'], 'qty': item['quantity']} for item in dataop]
        return JsonResponse(chart_data, safe=False)
    else:
        return JsonResponse({'error': 'User is not authenticated'})


def logout(request):
    auth.logout(request)
    return redirect('home')



def register(request):
    return render(request, 'register.html')




def handlepasswordchange(request):
    if request.method == 'POST' :
        pass1= request.POST['pass1']
        pass2= request.POST['pass2']

        if pass1 != pass2:
            messages.warning(request, "Passwords don't match, please try again")
            return redirect('dashboard')
        else:
           tuser = request.user
           tuser.set_password(pass1)
           tuser.save()
           #print success message here
           auth.logout(request)
           return redirect('login')
    else:
        return HttpResponse('Please Login to change password')

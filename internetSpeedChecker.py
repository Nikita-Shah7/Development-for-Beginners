# import sys
# sys.path.append("D:\Projects\Python\myInstalledPackages")


import speedtest
import time


def speedTest():
    test = speedtest.Speedtest()

    ########## To check download speed.
    print("\nPerforming download speed test...")
    numberOfTests = 3
    downloadSpeedTestResultList = []
    for i in range(numberOfTests):
        downloadSpeedTestResultList.append(test.download())
    downloadSpeedTestResult = sum(downloadSpeedTestResultList)/len(downloadSpeedTestResultList)

    # print(downloadSpeedTestResultList)
    # print(downloadSpeedTestResult)

    print(f"Download Speed = {downloadSpeedTestResult:.2f} bps = {downloadSpeedTestResult/pow(1024,2):.2f} Mbps")
    downloadSpeedTestResult = round(downloadSpeedTestResult/pow(1024, 2), 2)

     ########## To check upload speed.
    # print("\nPerforming upload speed test...")
    # uploadSpeedTestRes = test.upload()
    # print(f"Upload Speed = {uploadSpeedTestRes:.2f} bps = {uploadSpeedTestRes/pow(1024,2):.2f} Mbps")

    ########## To check ping.
    # print("\nPerforming ping test...")
    # pingRes = test.results.ping
    # print(f"Ping (the response time of your connection) = {pingRes:.2f} ms\n")


try:
    speedTest()
except:
    print("SPEED TEST FAILED: Computer not connected to internet!")

